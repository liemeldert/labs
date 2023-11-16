import pandas as pd
import io
import requests
import typer
from pymongo import MongoClient

def save_to_mongodb(data, collection_name, connection_url):
    client = MongoClient(connection_url)
    db = client['wolbachiaproject']
    collection = db[collection_name]
    collection.insert_many(data)

def swap_collections(temp_collection_name, final_collection_name, connection_url):
    client = MongoClient(connection_url)
    db = client['wolbachiaproject']
    db[final_collection_name].drop()
    db[temp_collection_name].rename(final_collection_name)

def main(connection_url: str, url: str = "https://wolbachiaprojectdb.org/view-csv/", keys_to_keep = None):
    """
    Downloads a CSV file from a given URL, filters it to keep only specified keys,
    converts it to a list of dictionaries, and saves it to a MongoDB collection.

    Args:
        url (str): The URL to download the CSV file from.
        connection_url (str): The connection URL for the MongoDB database.
        keys_to_keep (list): A list of keys to keep from the CSV file. If None, all keys will be kept.
            ["entry_link", "entry_title", "image_urls", "location_lat", "location_lon"]

    Returns:
        None
    """
    # Send a GET request to the URL
    response = requests.get(url)

    # Read the CSV file into a pandas DataFrame
    # Read the CSV file from the response into a pandas DataFrame
    df = pd.read_csv(io.StringIO(response.content.decode('utf-8')), skiprows=1)

    # Filter the DataFrame to only keep the specified keys
    if keys_to_keep:
        df_filtered = df[keys_to_keep]
    else:
        df_filtered = df

    # Convert the filtered DataFrame to a list of dictionaries
    json_data = df_filtered.to_dict(orient="records")

    # Convert location_lat and location_lon to strings and replace NaN with empty string
    if keys_to_keep:
        if "location_lat" in keys_to_keep:
            df_filtered["location_lat"] = df_filtered["location_lat"].astype(str).replace("nan", "")
        
        if "location_lon" in keys_to_keep:
            df_filtered["location_lon"] = df_filtered["location_lon"].astype(str).replace("nan", "")
    
    df_filtered = df_filtered.astype(str)

    # Replace 'nan' with empty string
    df_filtered.replace('nan', '', inplace=True)        
        
    json_data = df_filtered.to_dict(orient="records")

    # Save the JSON data to a new MongoDB collection
    save_to_mongodb(json_data, 'temp_wolbachiaprojectdata', connection_url)

    # Swap the new collection with the existing collection
    swap_collections('temp_wolbachiaprojectdata', 'wolbachiaprojectdata', connection_url)

if __name__ == "__main__":
    typer.run(main)