from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from ibm_watsonx_ai.foundation_models.utils.enums import DecodingMethods, ModelTypes
from ibm_watsonx_ai import Credentials
from langchain_ibm import WatsonxLLM
import docx

# Function to setup Watsonx
def setup_watsonx():
    try:
        credentials = Credentials(
            url="https://us-south.ml.cloud.ibm.com",
            api_key="q1kffrDbAsFAzK5qhjGwGkK2gK_MgUXWSVSuCmYG7XeW"
        )
        
        project_id = "84b7e606-8040-40f9-a60e-02264e8d20a6" 
        model_id = ModelTypes.GRANITE_13B_CHAT_V2
        
        parameters = {
            GenParams.DECODING_METHOD: DecodingMethods.GREEDY,
            GenParams.MIN_NEW_TOKENS: 1,
            GenParams.MAX_NEW_TOKENS: 100,
            GenParams.STOP_SEQUENCES: ["Question:", "Explanation:", "Answer:"]
        }
        
        watsonx_llm = WatsonxLLM(
            model_id=model_id.value,
            url=credentials.get("url"),
            apikey=credentials.get("apikey"),
            project_id=project_id,
            params=parameters
        )
        return watsonx_llm, "WatsonX set up successfully."
    except Exception as e:
        return None, f"Error setting up WatsonX: {str(e)}"

# Function to process the question using the LLM
def process_question_with_doc(question, watsonx_llm):
    try:
        # Use WatsonX to analyze the report and formalise it
        prompt_template = PromptTemplate(
            input_variables=["question"],
            template="""You are a chatbot that need to take the input from the user who inputs information about some crime.
            Dont add any extra information to the crime reported by user.
            {question}
            Keep your output brief and accurate to the info provided by user.
            Give the output in the following format:
            Time of Crime:
            Place of Crime :
            Crime Details : 
            Stop your answer here.Dont add anything extra.
            If place and time are not mentioned in the input.Mention as not found."""
        )
        
        llm_chain = LLMChain(llm=watsonx_llm, prompt=prompt_template)
        response = llm_chain.run(question=question)
        
        # Split response into paragraphs and get first two
        paragraphs = [p.strip() for p in response.split('\n\n') if p.strip()]
        first_two_paragraphs = '\n\n'.join(paragraphs[:2])
        
        return first_two_paragraphs
        
    except Exception as e:
        return f"Error processing question: {str(e)}"