searchState.loadedDescShard("webpki", 0, "webpki: Web PKI X.509 Certificate Validation.\nThe encoding of some ASN.1 DER-encoded item is invalid.\nThe encoding of an ASN.1 DER-encoded time is invalid.\nA CA certificate is being used as an end-entity …\nThe certificate is expired; i.e. the time it is being …\nThe certificate is not valid for the name it is being …\nThe certificate is not valid yet; i.e. the time it is …\nRequires the <code>alloc</code> feature. A DNS Name suitable for use in …\nA reference to a DNS Name suitable for use in the TLS …\nECDSA signatures using the P-256 curve and SHA-256.\nECDSA signatures using the P-256 curve and SHA-384. …\nECDSA signatures using the P-384 curve and SHA-256. …\nECDSA signatures using the P-384 curve and SHA-384.\nED25519 signatures according to RFC 8410\nAn end-entity certificate.\nAn end-entity certificate is being used as a CA …\nAn error that occurs during certificate validation or name …\nAn X.509 extension is invalid.\nThe certificate validity period (notBefore, notAfter) is …\nAn error indicating that a <code>DnsNameRef</code> could not built …\nThe signature is invalid for the given public key.\nThe certificate extensions are missing or malformed.\nThe certificate violates one or more name constraints.\nThe certificate violates one or more path length …\nRSA PKCS#1 1.5 signatures using SHA-256 for keys of …\nRSA PKCS#1 1.5 signatures using SHA-384 for keys of …\nRSA PKCS#1 1.5 signatures using SHA-512 for keys of …\nRSA PKCS#1 1.5 signatures using SHA-384 for keys of …\nRSA PSS signatures using SHA-256 for keys of 2048-8192 …\nRSA PSS signatures using SHA-384 for keys of 2048-8192 …\nRSA PSS signatures using SHA-512 for keys of 2048-8192 …\nThe certificate is not valid for the Extended Key Usage …\nA signature algorithm.\nThe algorithm in the TBSCertificate “signature” field …\nThe time type.\nTrust anchors which may be used for authenticating clients.\nTrust anchors which may be used for authenticating servers.\nA trust anchor (a.k.a. root CA).\nA valid issuer for the certificate could not be found.\nThe certificate is not a v3 X.509 certificate.\nThe certificate contains an unsupported critical extension.\nThe signature algorithm for a signature is not in the set …\nThe signature’s algorithm does not match the algorithm …\nReturns a <code>DnsNameRef</code> that refers to this <code>DnsName</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreate a <code>webpki::Time</code> from a unix timestamp.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe value of a DER-encoded NameConstraints, containing name\nThe value of the <code>subjectPublicKeyInfo</code> field of the trust …\nThe value of the <code>subject</code> field of the trust anchor.\nConstructs a <code>DnsName</code> from this <code>DnsNameRef</code>\nParse the ASN.1 DER-encoded X.509 encoding of the …\nCreate a <code>webpki::Time</code> from a <code>std::time::SystemTime</code>.\nConstructs a <code>DnsNameRef</code> from the given input if the input …\nConstructs a <code>DnsNameRef</code> from the given input if the input …\nInterprets the given DER-encoded certificate as a …\nVerifies that the certificate is valid for at least one of …\nVerifies that the certificate is valid for the given DNS …\nVerifies that the end-entity certificate is valid for use …\nVerifies that the end-entity certificate is valid for use …\nVerifies the signature <code>signature</code> of message <code>msg</code> using the …")