import os

# Define ignored folders and files for structure generation
IGNORED_FOLDERS_IN_STRUCTURE = {"node_modules", "__pycache__", ".git", "migrations", "venv", ".vscode","dist","docs"}
IGNORED_FILES_IN_STRUCTURE = {".DS_Store", "package-lock.json", "performance.json"}

# Define ignored folders and files for content extraction
IGNORED_FOLDERS_IN_CONTENT = {"node_modules", "__pycache__", ".git", "migrations", "venv", ".vscode","dist","docs"}
IGNORED_FILES_IN_CONTENT = {".env", ".gitignore", ".DS_Store", "package-lock.json", "performance.json",
                            "ProjectStructure_generator.py", "performance.db", "performance_data.json", "README.md","gitcommands.txt","vite.svg","$.svg"}

# File extensions to ignore
IGNORED_FILES_IN_CONTENT_EXTENSIONS = {".svg", ".log", ".tmp",".txt"}  # Add any other extensions you want to ignore

# Get the project root directory and project name
project_root = os.getcwd()
project_name = os.path.basename(project_root)
OUTPUT_FILE = f"{project_name}_project_summary.txt"

# Dynamically ignore the generated output file
IGNORED_FILES_IN_CONTENT.add(OUTPUT_FILE)

def get_tree_structure(directory, prefix=""):
    """
    Recursively generates the project structure while ignoring specific files and folders.
    """
    structure = []
    try:
        entries = sorted(os.listdir(directory))
        entries = [e for e in entries if e not in IGNORED_FOLDERS_IN_STRUCTURE and e not in IGNORED_FILES_IN_STRUCTURE]
        
        for index, entry in enumerate(entries):
            entry_path = os.path.join(directory, entry)
            connector = "└── " if index == len(entries) - 1 else "├── "
            
            structure.append(f"{prefix}{connector}{entry}")

            if os.path.isdir(entry_path):
                extension = "    " if index == len(entries) - 1 else "│   "
                structure.extend(get_tree_structure(entry_path, prefix + extension))
    except PermissionError:
        structure.append(f"{prefix}└── [Permission Denied] {directory}")
    
    return structure

def extract_file_content(file_path):
    """
    Reads a file's content and returns it. Skips files in the ignored list.
    """
    file_name = os.path.basename(file_path)
    
    if file_name in IGNORED_FILES_IN_CONTENT or any(file_name.endswith(ext) for ext in IGNORED_FILES_IN_CONTENT_EXTENSIONS):
        return "[Skipped: Ignored file]\n"
    
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        return f"[Error reading file: {e}]"

def generate_project_summary(directory):
    """
    Generates project structure and extracts file contents (excluding ignored ones).
    """
    summary = [f"### Project Name: {project_name} ###\n"]
    
    summary.append("### Project Structure ###\n")
    summary.extend(get_tree_structure(directory))  # Ignore some files only in the tree
    
    summary.append("\n### Code Files and Content ###\n")

    for root, _, files in os.walk(directory):
        if any(ignored in root for ignored in IGNORED_FOLDERS_IN_CONTENT):
            continue  # Skip ignored folders during content extraction

        for file in files:
            file_path = os.path.join(root, file)
            file_name = os.path.basename(file_path)

            if file_name in IGNORED_FILES_IN_CONTENT:
                continue  # Skip ignored files

            # Write the full path from the root directory
            relative_path = os.path.relpath(file_path, project_root)
            summary.append(f"\n#### {relative_path} ####\n")  # Full path instead of just file name
            summary.append(extract_file_content(file_path))
            summary.append("\n" + "=" * 80 + "\n")  # Separator for readability

    return "\n".join(summary)

if __name__ == "__main__":
    project_summary = generate_project_summary(project_root)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(project_summary)

    print(f"✅ Project summary for '{project_name}' saved to '{OUTPUT_FILE}'.")
