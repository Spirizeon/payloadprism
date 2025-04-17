import ember
import lightgbm as lgb
import json
import sys

def predict_verdict(pe_file_path, model_path="model.txt"):
    # Load model
    model = lgb.Booster(model_file=model_path)
    extractor = ember.PEFeatureExtractor()

    # Read file
    with open(pe_file_path, "rb") as f:
        bytez = f.read()

    # Extract features
    features = extractor.feature_vector(bytez)

    # Predict
    pred = model.predict([features])[0]
    verdict = "malicious" if pred >= 0.5 else "benign"

    return {"verdict": verdict, "score": float(pred)}

# Example usage
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ember_predict.py path_to_pe_file.exe")
        sys.exit(1)

    result = predict_verdict(sys.argv[1])
    print(json.dumps(result, indent=2))

