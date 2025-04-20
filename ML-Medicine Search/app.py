import pandas as pd
import google.generativeai as genai
from flask import Flask, render_template, request

# 🔑 Hardcode Gemini API key
genai.configure(api_key="your-real-gemini-api-key")  # <-- Replace with actual key

app = Flask(__name__)

# 📄 Load CSV and clean column names
df = pd.read_csv("A_Z_medicines_dataset_of_India.csv")
df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]

# 🧠 Prompt template for Gemini
def generate_prompt(medicine):
    comp1 = medicine.get('short_composition1', '')
    comp2 = medicine.get('short_composition2', '')
    composition = ', '.join(filter(None, [comp1, comp2])) or 'the given composition'
    name = medicine.get('name', 'this medicine')

    return f"""
Provide a short, clear description of the medicine "{name}" which contains {composition}.
Explain what it is used for, and how it helps.
Avoid side effects, dosage, or medical advice.
Keep it simple and useful.
"""

# 🤖 Use Gemini to get description
def get_gemini_description(medicine):
    prompt = generate_prompt(medicine)
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini Error:", e)
        return None

# 🌐 Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    med_name = request.form['medicine_name'].strip().lower()
    result = df[df['name'].str.lower() == med_name]

    if not result.empty:
        medicine = result.iloc[0].to_dict()

        if not medicine.get("description") or pd.isna(medicine.get("description")):
            desc = get_gemini_description(medicine)
            medicine["description"] = desc or "No description available."

        return render_template('result.html', medicine=medicine)
    else:
        return render_template('result.html', medicine=None, query=med_name)

if __name__ == '__main__':
    app.run(debug=True)
