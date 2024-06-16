from dotenv import load_dotenv
from email import EmailMessage
import os

#security dotenv
load_dotenv()
gmail = os.getenv("GMAIL_ADDRESS")
gmail_p = os.getenv("GMAIL_PASSWORD")

#main
email = EmailMessage

email["Subject"] = "Automated Test Newsletter"

email.add_alternative(f"""\
    
<html>

<head>
</head>

<body>
    Unused
</body>

</html>

""", subtype="html")

email.set_content("Test by alavtzis")