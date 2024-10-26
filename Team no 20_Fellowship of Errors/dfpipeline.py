import cv2
import numpy as np
from tensorflow.keras.applications import Xception
from tensorflow.keras.preprocessing import image
import librosa
from scipy.signal import welch
from moviepy.editor import VideoFileClip

class SimpleDeepfakeDetector:
    def __init__(self):
        # Initialize face detector
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
    def process_video(self, video_path):
        scores = {
            'facial': 0,
            'frequency': 0,
            'audio_visual': 0
        }
        
        # Load video
        video = VideoFileClip(video_path)
        frames = [frame for frame in video.iter_frames()]
        audio = video.audio
        
        # Process each component
        scores['facial'] = self._analyze_face_movement(frames)
        scores['frequency'] = self._analyze_frequency_domain(frames)
        scores['audio_visual'] = self._analyze_audio_visual_sync(frames, audio)
        
        return self._calculate_final_score(scores)
    
    def _analyze_face_movement(self, frames):
        """Simplified Face Movement Analysis using Haar Cascade"""
        facial_scores = []
        for frame in frames[::10]:
            gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            
            if len(faces) > 0:
                # Analyze face movement consistency
                face_areas = [w * h for (x, y, w, h) in faces]
                score = 1 - (np.std(face_areas) / np.mean(face_areas)) if face_areas else 0
                facial_scores.append(score)
            
        return np.mean(facial_scores) if facial_scores else 0.5
    
    def _analyze_frequency_domain(self, frames):
        """Frequency Domain Analysis"""
        freq_scores = []
        for frame in frames[::10]:
            gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
            f_transform = np.fft.fft2(gray)
            f_shift = np.fft.fftshift(f_transform)
            magnitude_spectrum = np.log(np.abs(f_shift) + 1)
            
            # Analyze frequency distribution
            score = float(1 - np.std(magnitude_spectrum) / np.mean(magnitude_spectrum))
            freq_scores.append(score)
            
        return np.mean(freq_scores)
    
    def _analyze_audio_visual_sync(self, frames, audio):
        """Simplified Audio-Visual Synchronization Analysis"""
        if audio is None:
            return 0.5
            
        try:
            audio_data = audio.to_soundarray()
            # Calculate audio energy
            audio_energy = np.abs(audio_data.mean(axis=1))
            
            # Calculate frame differences
            frame_diffs = []
            for i in range(len(frames)-1):
                diff = np.mean(np.abs(frames[i+1] - frames[i]))
                frame_diffs.append(diff)
            
            # Normalize and compare
            audio_energy = (audio_energy - np.min(audio_energy)) / (np.max(audio_energy) - np.min(audio_energy))
            frame_diffs = (frame_diffs - np.min(frame_diffs)) / (np.max(frame_diffs) - np.min(frame_diffs))
            
            # Calculate correlation
            correlation = np.corrcoef(audio_energy[:len(frame_diffs)], frame_diffs)[0,1]
            return float(abs(correlation))
        except:
            return 0.5
    
    def _calculate_final_score(self, scores):
        """Calculate final deepfake detection score"""
        weights = {
            'facial': 0.4,
            'frequency': 0.3,
            'audio_visual': 0.3
        }
        
        final_score = sum(score * weights[component] 
                         for component, score in scores.items())
        
        return {
            'final_score': final_score,
            'component_scores': scores,
            'interpretation': {
                'verdict': 'Real' if final_score > 0.7 else 'Likely Deepfake',
                'confidence': abs(final_score - 0.5) * 2,
                'anomalies': [component for component, score in scores.items() 
                            if score < 0.7]
            }
        }

# Example usage
def analyze_video(video_path):
    detector = SimpleDeepfakeDetector()
    results = detector.process_video(video_path)
    
    print(f"Deepfake Detection Results:")
    print(f"Final Score: {results['final_score']:.2f}")
    print("\nComponent Scores:")
    for component, score in results['component_scores'].items():
        print(f"- {component}: {score:.2f}")
    print("\nInterpretation:")
    print(f"Verdict: {results['interpretation']['verdict']}")
    print(f"Confidence: {results['interpretation']['confidence']:.2f}")
    if results['interpretation']['anomalies']:
        print("Suspicious components:", ", ".join(results['interpretation']['anomalies']))
    
    return results