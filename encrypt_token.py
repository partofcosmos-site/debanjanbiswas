import hashlib
import os
import re
import sys

def sha256(data):
    return hashlib.sha256(data).digest()

def encrypt_stream(plaintext, passcode):
    passcode_bytes = passcode.encode('utf-8')
    key = sha256(passcode_bytes)
    
    plaintext_bytes = plaintext.encode('utf-8')
    nonce_bytes = os.urandom(16)
    
    encrypted_bytes = bytearray(len(plaintext_bytes))
    block_size = 32
    num_blocks = (len(plaintext_bytes) + block_size - 1) // block_size
    
    for i in range(num_blocks):
        # counter bytes: key + nonce + blockIndex (4 bytes big-endian)
        counter_bytes = key + nonce_bytes + i.to_bytes(4, 'big')
        block_key = sha256(counter_bytes)
        
        start = i * block_size
        end = min(start + block_size, len(plaintext_bytes))
        for j in range(start, end):
            encrypted_bytes[j] = plaintext_bytes[j] ^ block_key[j - start]
            
    return encrypted_bytes.hex(), nonce_bytes.hex()

def main():
    print("=" * 60)
    print("           COSMIC LOUNGE - CREDENTIAL ENCRYPTOR")
    print("=" * 60)
    print("This script encrypts your GitHub Personal Access Token (PAT) using")
    print("your passcode. The encrypted token is stored in app.js, keeping")
    print("your repository secure.")
    print("-" * 60)
    
    try:
        pat = input("1. Enter your GitHub PAT (ghp_xxx): ").strip()
        if not pat:
            print("Error: GitHub PAT cannot be empty.")
            sys.exit(1)
            
        passcode = input("2. Enter your desired Curator Passcode (e.g., cosmos): ").strip()
        if not passcode:
            print("Error: Passcode cannot be empty.")
            sys.exit(1)
            
        owner = input("3. Enter Repository Owner [partofcosmos-site]: ").strip()
        if not owner:
            owner = "partofcosmos-site"
            
        repo = input("4. Enter Repository Name [debanjanbiswas]: ").strip()
        if not repo:
            repo = "debanjanbiswas"
            
        # 1. Compute hash of passcode for verification
        passcode_hash = hashlib.sha256(passcode.encode('utf-8')).hexdigest()
        
        # 2. Encrypt PAT using passcode
        encrypted_pat, iv = encrypt_stream(pat, passcode)
        
        # 3. Read and modify app.js
        app_js_path = os.path.join(os.path.dirname(__file__), "app.js")
        if not os.path.exists(app_js_path):
            print(f"Error: Could not find app.js at {app_js_path}")
            sys.exit(1)
            
        with open(app_js_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Regex replacements to inject encrypted credentials
        content = re.sub(r'const GITHUB_ENCRYPTED_PAT = ".*?";', f'const GITHUB_ENCRYPTED_PAT = "{encrypted_pat}";', content)
        content = re.sub(r'const GITHUB_ENCRYPTED_IV = ".*?";', f'const GITHUB_ENCRYPTED_IV = "{iv}";', content)
        content = re.sub(r'const expectedHash = ".*?";', f'const expectedHash = "{passcode_hash}";', content)
        content = re.sub(r'owner: syncOwnerInput \? .*? : ".*?"', f'owner: "{owner}"', content)
        content = re.sub(r'repo: syncRepoInput \? .*? : ".*?"', f'repo: "{repo}"', content)
        
        # Clean up any leftover sync input DOM element fallbacks in the script logic to align
        content = re.sub(r'owner: config\.owner \|\| ".*?"', f'owner: "{owner}"', content)
        content = re.sub(r'repo: config\.repo \|\| ".*?"', f'repo: "{repo}"', content)
        
        with open(app_js_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        print("-" * 60)
        print("Success! Credentials encrypted and written to app.js.")
        print("Verification Details:")
        print(f"  * Passcode Hash: {passcode_hash[:10]}...")
        print(f"  * Encrypted PAT: {encrypted_pat[:10]}...")
        print(f"  * Nonce (IV):    {iv}")
        print("=" * 60)
        print("Next steps:")
        print("  1. Verify the site works locally (Ctrl+Shift+K -> Unlock -> Publish).")
        print("  2. Push the changes to GitHub (git add app.js && git commit && git push).")
        print("=" * 60)
        
    except KeyboardInterrupt:
        print("\nOperation cancelled.")
        sys.exit(0)

if __name__ == "__main__":
    main()
