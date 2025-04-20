import google.generativeai as genai
import pandas as pd
import time

# Configure API key
genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-pro")

# Load CSV
df = pd.read_csv("A_Z_medicines_dataset_of_India.csv")
df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]

# Add column if it doesn't exist
if 'description' not in df.columns:
    df['description'] = ""

# Loop through medicines
for i in range(len(df)):
    name = df.loc[i, 'name']
    composition = df.loc[i, 'composition']
    current_desc = df.loc[i, 'description']

    if pd.isna(current_desc) or current_desc.strip() == "":
        prompt = f"""Give a short medical use-case description (1-2 lines) for the following Indian medicine:
        Name: {name}
        Composition: {composition}
        Only return the description. No headings or extra text."""

        try:
            response = model.generate_content(prompt)
            desc = response.text.strip()
            df.at[i, 'description'] = desc
            print(f"[{i+1}] {name} → {desc}")
            time.sleep(1.2)  # Avoid hitting rate limit
        except Exception as e:
            print(f"Error at row {i}: {e}")
            df.at[i, 'description'] = "ERROR"

# Save updated CSV
df.to_csv("A_Z_medicines_dataset_of_India.csv", index=False)
