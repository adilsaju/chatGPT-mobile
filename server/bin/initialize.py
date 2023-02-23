import gpt
import json
import argparse

chatbot1 = None

def ask(prompt):
    response = chatbot1.ask(prompt, temperature=float(0.5))
    # print(response)
    # print(response["choices"][0]["text"],end="")
    r1=response["choices"][0]["text"]
    return r1

def get_bot():

    # print(
    #     """
    # ChatGPT - A command-line interface to OpenAI's ChatGPT (https://chat.openai.com/chat)
    # Repo: github.com/acheong08/ChatGPT
    # """,
    # )
    # Read the configuration file
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Access the configuration data
    # print(config['key'])
    # Initialize chatbot
    chatbot = gpt.Chatbot(api_key=config['key'])
    return chatbot


# parser = argparse.ArgumentParser(description='gpt of your program')

# parser.add_argument('--init', action='store_true' , help='Path to input file')
# parser.add_argument('--ask', type=str, help='Path to output file')

# args = parser.parse_args()

# prompt = args.ask

# if args.init:
#     chatbot1 = get_bot()
#     print("initialized")
# elif prompt:
#     response1=ask(prompt)
#     print(response1)
# else:
#     print("give some args")
chatbot1 = get_bot()
print("initialized")

#wait for user's each question
while True:
    user_input = input(" ")
    # print(user_input)
    print(ask(user_input))
    
    # if user_input == "":
    #     break
    # if not user_input:
    #     break
    # if user_input == 'quit':
    #     break
    # # print("You entered:", user_input)
    # print(ask(user_input))