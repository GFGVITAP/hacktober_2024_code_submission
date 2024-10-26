from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.llms.ollama import Ollama
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from pydantic import BaseModel
import io
import fitz  # Importing PyMuPDF

# Initialize FastAPI app
app = FastAPI()

# Request model for question endpoint
class QuestionRequest(BaseModel):
    user_question: str

# Function to extract text from PDF documents using PyMuPDF
def get_pdf_txt(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        # Wrap the bytes in a BytesIO stream
        pdf_stream = io.BytesIO(pdf)
        pdf_document = fitz.open(stream=pdf_stream, filetype="pdf")
        
        # Iterate through each page and extract text
        for page_number in range(pdf_document.page_count):
            page = pdf_document.load_page(page_number)
            text += page.get_text()
            
    return text

# Function to split text into chunks
def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n\n",
        chunk_size=1500,
        chunk_overlap=500,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

# Function to create FAISS vector store from text chunks
def create_vec_store(chunks):
    embedding_func = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    faiss_index = FAISS.from_texts(chunks, embedding=embedding_func)
    faiss_index.save_local('faiss_store')
    return faiss_index

# Function to initialize conversation chain
def get_conversation_chain():
    prompt_template = """
        You are a helpful PDF chatbot assistant. 
        You must respond to the queries of the user.
        You will not answer any question that is given to you which is out of context.

    Context:
    {context}

    User Question:
    {question}

Your Response:
        """
    llm = Ollama(model="llama3.1:8b",top_k=30,top_p=0.5,num_gpu=1) 
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(llm, chain_type="stuff", prompt=prompt)
    return chain

# Function to handle user input and interaction with the chatbot
def handle_user_input(user_question):
    embedding_func = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    new_db = FAISS.load_local(embeddings=embedding_func, folder_path="faiss_store", allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question, k=2)
    chain = get_conversation_chain()
    response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    return response['output_text']

# Endpoint for processing PDF files
@app.post("/process-pdfs/")
async def process_pdfs(files: list[UploadFile] = File(...)):
    try:
        pdf_docs = [await file.read() for file in files]
        raw_text = get_pdf_txt(pdf_docs)
        text_chunks = get_text_chunks(raw_text)
        create_vec_store(text_chunks)
        return JSONResponse(content={"message": "Text extraction and vectorization complete!"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

# Endpoint for asking a question
@app.post("/ask-question/")
async def ask_question(request: QuestionRequest):
    try:
        user_question = request.user_question
        response = handle_user_input(user_question)
        return JSONResponse(content={"answer": response})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
