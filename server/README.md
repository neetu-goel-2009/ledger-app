PS C:\Code\POC\poc-ask-file\v1> cd .\server\
PS C:\Code\POC\poc-ask-file\v1\server> .\.venv\Scripts\activate
(.venv) PS C:\Code\POC\poc-ask-file\v1\server> uvicorn main:app --host=0.0.0.0 --port=8000 --reload

uvicorn main:app --host=0.0.0.0 --port=8000 --reload

pip freeze > requirements.txt

gunicorn main:app --workers 4 --timeout 120 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

hypercorn main:app --bind 0.0.0.0:8000 --workers 3 --reload

pip install -r .\requirements.txt
