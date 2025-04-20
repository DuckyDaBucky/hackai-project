import subprocess
import sys
import os

# Try to import pkg_resources, install setuptools if not available
try:
    import pkg_resources
except ImportError:
    print("pkg_resources not found, installing setuptools...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "setuptools"])
    import pkg_resources

def check_venv():
    """Check if running in a virtual environment"""
    in_venv = sys.prefix != sys.base_prefix
    if not in_venv:
        print("WARNING: You are not running in a virtual environment!")
        print("It's recommended to create and activate a virtual environment first.")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            print("Exiting. Please create and activate a virtual environment before running this script.")
            sys.exit(1)

def get_installed_packages():
    """Get a set of installed packages"""
    return {pkg.key for pkg in pkg_resources.working_set}

def install_dependencies():
    """Install all required dependencies for the chatbot"""
    
    # List of required packages
    required_packages = [
        "pymupdf",           # For fitz module (PDF processing)
        "google-generativeai", # For Google Generative AI
        "sentence-transformers", # For text embeddings
        "faiss-cpu",         # For vector similarity search
        "numpy",             # For numerical operations
        "python-dotenv",     # For loading environment variables
        "fastapi",           # For API framework
        "uvicorn",           # For ASGI server
        "pydantic",          # For data validation
        "python-multipart",  # For handling file uploads in FastAPI
        f"pip install {'"fastapi[standard]"'}"
    ]
    
    # Get installed packages
    installed = get_installed_packages()
    
    # Determine which packages need to be installed
    to_install = [pkg for pkg in required_packages if pkg.replace('-', '_') not in installed]
    
    if not to_install:
        print("All required packages are already installed!")
        return
    
    print(f"Installing {len(to_install)} packages: {', '.join(to_install)}")
    
    # Install missing packages
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install"] + to_install)
        print("\nAll dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"\nError installing packages: {e}")
        sys.exit(1)

def check_and_create_upload_dir():
    """Check if uploads directory exists and create it if not"""
    upload_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
    if not os.path.exists(upload_dir):
        try:
            os.makedirs(upload_dir)
            print(f"Created 'uploads' directory at: {upload_dir}")
        except Exception as e:
            print(f"Failed to create 'uploads' directory: {e}")

if __name__ == "__main__":
    print("Setting up dependencies for ChatBot...")
    check_venv()
    install_dependencies()
    check_and_create_upload_dir()
    print("\nSetup complete! You can now run the chatbot.py application.")