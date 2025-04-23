import hashlib
import os

# Standard import pattern - imports at the top of the file
try:
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    CRYPTO_AVAILABLE = True
except ImportError:
    print("Warning: cryptography module not found. Cryptographic functions will not work.")
    print("Install it with 'pip install cryptography'")
    CRYPTO_AVAILABLE = False

def encrypt_UID(uid):
    return get_sha256_hash(uid)

def get_sha256_hash(input_string):
    """
    Calculate the SHA-256 hash of the input string.
    
    Args:
        input_string (str): The string to hash.
        
    Returns:
        str: The hexadecimal representation of the SHA-256 hash.
    """
    # Convert the string to bytes (required for hashlib)
    input_bytes = input_string.encode('utf-8')
    
    # Create a SHA-256 hash object and calculate the hash
    hash_object = hashlib.sha256(input_bytes)
    
    # Return the hexadecimal representation of the hash
    return hash_object.hexdigest()

def ECDHE_handshake():
    """
    Perform the Elliptic Curve Diffie-Hellman Ephemeral key exchange handshake.
    
    This function:
    1. Generates a private key
    2. Derives the corresponding public key
    3. Returns both keys for key exchange
    
    Returns:
        tuple: (private_key, public_key) where:
            - private_key is the secret key (keep this secure)
            - public_key is the key to share with the other party
    """
    if not CRYPTO_AVAILABLE:
        return None
        
    # Generate a private key for use in the exchange
    private_key = ec.generate_private_key(
        ec.SECP256R1()  # Standard curve, also known as P-256
    )
    
    # Get the public key
    public_key = private_key.public_key()
    
    # Serialize the public key to bytes for sharing
    public_key_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    
    return (private_key, public_key_bytes)

def ECDHE_derive_shared_secret(private_key, peer_public_key_bytes):
    """
    Derive a shared secret using our private key and the peer's public key.
    
    Args:
        private_key: Our private key from ECDHE_handshake
        peer_public_key_bytes: The peer's public key bytes received over the communication channel
        
    Returns:
        bytes: The shared secret key
    """
    if not CRYPTO_AVAILABLE:
        return None
    
    # Deserialize the peer's public key
    peer_public_key = serialization.load_pem_public_key(peer_public_key_bytes)
    
    # Compute shared secret
    shared_key = private_key.exchange(ec.ECDH(), peer_public_key)
    
    # Derive a key using the shared secret
    derived_key = get_sha256_hash(shared_key.hex())
    
    return derived_key

def AES_encrypt(plaintext, key):
    """
    Encrypt plaintext using AES in GCM mode.
    
    Args:
        plaintext (str or bytes): Data to encrypt
        key (str or bytes): Encryption key (must be 16, 24, or 32 bytes long)
        
    Returns:
        bytes: IV + ciphertext + tag (concatenated)
        
    Raises:
        ValueError: If key is not valid AES key length
    """
    if not CRYPTO_AVAILABLE:
        raise ImportError("Cryptography module not available")
    
    # Convert string inputs to bytes if needed
    if isinstance(plaintext, str):
        plaintext = plaintext.encode('utf-8')
    if isinstance(key, str):
        key = key.encode('utf-8')
    
    # Validate key length (AES-128, AES-192, or AES-256)
    if len(key) not in (16, 24, 32):
        if len(key) < 32:  # If key is too short, hash it to get 32 bytes
            key = get_sha256_hash(key if isinstance(key, str) else key.decode('utf-8'))
            key = bytes.fromhex(key)
        else:  # If key is too long, truncate or hash it
            key = key[:32]
    
    # Generate random IV
    iv = os.urandom(12)  # 96-bit IV as recommended for GCM
    
    # Create encryptor
    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv)
    ).encryptor()
    
    # Encrypt the plaintext
    ciphertext = encryptor.update(plaintext) + encryptor.finalize()
    
    # Get the authentication tag
    tag = encryptor.tag
    
    # Return IV + ciphertext + tag
    return iv + ciphertext + tag

def AES_decrypt(ciphertext_data, key):
    """
    Decrypt ciphertext using AES in GCM mode.
    
    Args:
        ciphertext_data (bytes): IV + ciphertext + tag (as returned by AES_encrypt)
        key (str or bytes): Decryption key (must be 16, 24, or 32 bytes long)
        
    Returns:
        bytes: Decrypted plaintext
        
    Raises:
        ValueError: If key length is invalid or authentication fails
    """
    if not CRYPTO_AVAILABLE:
        raise ImportError("Cryptography module not available")
    
    # Convert string key to bytes if needed
    if isinstance(key, str):
        key = key.encode('utf-8')
    
    # Validate key length
    if len(key) not in (16, 24, 32):
        if len(key) < 32:  # If key is too short, hash it to get 32 bytes
            key = get_sha256_hash(key if isinstance(key, str) else key.decode('utf-8'))
            key = bytes.fromhex(key)
        else:  # If key is too long, truncate or hash it
            key = key[:32]
    
    # Extract IV, ciphertext, and tag
    iv = ciphertext_data[:12]
    tag = ciphertext_data[-16:]  # GCM tag is 16 bytes
    ciphertext = ciphertext_data[12:-16]
    
    # Create decryptor
    decryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv, tag)
    ).decryptor()
    
    # Decrypt and verify the ciphertext
    try:
        plaintext = decryptor.update(ciphertext) + decryptor.finalize()
        return plaintext
    except Exception as e:
        raise ValueError(f"Decryption failed: {str(e)}")