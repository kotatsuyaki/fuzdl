searchState.loadedDescShard("tiff", 0, "Decoding and Encoding of TIFF Images\nPixel is CMYK\nAn enumeration over supported color types and their bit …\nContains the error value\nThe Image is not formatted properly.\nPixel is grayscale\nPixel is grayscale with an alpha channel\nAn integer conversion to or from a platform size failed, …\nAn I/O Error occurred while decoding the image.\nThe Limits of the Decoder is exceeded.\nContains the success value\nPixel is an index into a color palette\nPixel contains R, G and B channels\nPixel is RGB with an alpha channel\nTiff error kinds.\nThe image is not formatted properly.\nResult of an image decoding/encoding process\nThe Decoder does not support features required by the …\nThe Decoder does not support features required by the …\nUser attempted to use the Decoder in a way that is …\nThe image does not support the requested operation\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChunk type of the internal representation\nThe representation of a TIFF decoder\nResult of a decoding process\nA slice of 32 bit IEEE floats\nA vector of 32 bit IEEE floats\nA slice of 64 bit IEEE floats\nA vector of 64 bit IEEE floats\nA slice of 16 bits signed ints\nA vector of 16 bit signed ints\nA slice of 32 bits signed ints\nA vector of 32 bit signed ints\nA slice of 64 bits signed ints\nA vector of 64 bit signed ints\nA slice of 8 bits signed ints\nA vector of 8 bit signed ints\nDecoding limits\nA slice of unsigned words\nA vector of unsigned words\nA slice of 32 bit unsigned ints\nA vector of 32 bit unsigned ints\nA slice of 64 bit unsigned ints\nA vector of 64 bit unsigned ints\nA slice of unsigned bytes\nA vector of unsigned bytes\nReturns the byte_order\nReturns the size of the data in the chunk with the …\nReturns the default chunk size for the current image. Any …\nThe maximum size of any <code>DecodingResult</code> in bytes, the …\nTries to retrieve a tag. Return <code>Ok(None)</code> if the tag is not …\nTries to retrieve a tag and convert it to the desired …\nTries to retrieve a vector of all a tag’s values and …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe chunk type (Strips / Tiles) of the image\nTries to retrieve a tag. Returns an error if the tag is …\nTries to retrieve a tag and convert it to a ascii vector.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to the desired type.\nTries to retrieve a tag and convert it to a 8bit vector.\nTries to retrieve a tag and convert it to the desired …\nMoves the cursor to the specified offset\nFunction for reading TIFF tags\nThe maximum size of any ifd value in bytes, the default is …\nReset the decoder.\nMaximum size for intermediate buffer which may be used to …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns <code>true</code> if there is at least one more image available.\nCreate a new decoder that decodes from the stream <code>r</code>\nReads in the next image. If there is no further image in …\nReads a TIFF byte value\nRead the specified chunk (at index <code>chunk_index</code>) and return …\nReads a TIFF double value\nReads a TIFF float value\nDecodes the entire image and return it as a Vector\nReads a TIFF long value\nReads a TIFF IFA offset/value field\nReads a TIFF IFA offset/value field\nReads a TIFF short value\nReads a TIFF slong value\nReads a TIFF sshort value\nReads a string\nRead a single strip from the image and return it as a …\nRead a single tile from the image and return it as a …\nLoads the IFD at the specified index in the list, if one …\nNumber of strips in image\nNumber of tiles in image\nA configuration that does not impose any limits.\nType representing an Image File Directory\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nLow level interface to encode ifd directories.\nType to represent tiff values of type <code>IFD</code>\nType to represent tiff values of type <code>IFD8</code>\nType to encode images strip by strip.\nNeeded for the <code>convert_slice</code> method.\nThe type of offset fields, <code>u32</code> for normal Tiff, <code>u64</code> for …\nType to represent tiff values of type <code>RATIONAL</code>\nType to represent tiff values of type <code>SRATIONAL</code>\nEncoder for Tiff and BigTiff files.\nTrait to abstract over Tiff/BigTiff differences.\nCreate a BigTiff file.\nCreate a standard Tiff file.\nTrait for types that can be encoded in a tiff file\nConvert a file offset to <code>Self::OffsetType</code>.\nInternal helper method for satisfying Rust’s type …\nAccess this value as an contiguous sequence of bytes. If …\nGet a reference of the underlying <code>DirectoryEncoder</code>\nWrite out the ifd directory.\nWrite out image and ifd directory.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreates a new encoder for standard Tiff files.\nCreates a new encoder for BigTiff files.\nCreate a <code>DirectoryEncoder</code> to encode an ifd directory.\nCreates a new Tiff or BigTiff encoder, inferred from the …\nCreate an <code>ImageEncoder</code> to encode an image one slice at a …\nCreate an <code>ImageEncoder</code> to encode an image one slice at a …\nNumber of samples the next strip should have.\nSet image resolution\nSet image resolution unit\nSet image number of lines per strip\nWrite this value to a TiffWriter. While the default …\nWrite this value to a TiffWriter. While the default …\nWrite some data to the tiff file, the offset of the data …\nWrite strips from data\nWrite the IFD entry count field with the given <code>count</code> value.\nWrite the (Big)Tiff header.\nConvenience function to write an entire image from memory.\nConvenience function to write an entire image from memory …\nWrite an offset value to the given writer.\nWrite a single strip.\nWrite a single ifd tag.\nSet image x-resolution\nSet image y-resolution\nThe value of the tiff tag <code>BitsPerSample</code>\nTrait for different colortypes that can be encoded.\nThe type of each sample of this colortype\nThe value of the tiff tag <code>SampleFormat</code>\nThe value of the tiff tag <code>PhotometricInterpretation</code>\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe conserative choice between speed and ratio.\nThe best compression available with Deflate.\nThe corresponding tag to the algorithm.\nAn algorithm used for compression with associated enums …\nAn algorithm used for compression\nAn enum to store each compression algorithm.\nThe Deflate algorithm used to compress image data in TIFF …\nThe level of compression used by the Deflate algorithm. It …\nThe fastest possible compression mode.\nThe LZW algorithm used to compress image data in TIFF …\nCompressor that uses the Packbits algorithm to compress …\nThe default algorithm which does not compress at all.\nThe default compression strategy does not apply any …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nMethod to optain a type that can store each variant of …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate a new deflate compressor with a specific level of …\nThe algorithm writes data directly into the writer. It …\n8-bit byte that contains a 7-bit ASCII code; the last byte …\n8-bit unsigned integer\nSee TIFF compression tags for reference.\n64-bit IEEE floating point\n32-bit IEEE floating point\n32-bit unsigned integer (offset)\nBigTIFF 64-bit unsigned integer (offset)\n32-bit unsigned integer\nBigTIFF 64-bit unsigned integer\nFraction stored as two 32-bit unsigned integers\nType to represent resolution units\n8-bit signed integer\n16-bit unsigned integer\n32-bit signed integer\nBigTIFF 64-bit signed integer\nFraction stored as two 32-bit signed integers\n16-bit signed integer\nTIFF tags\nThe type of an IFD entry (a 2 byte field).\n8-bit byte that may contain anything, depending on the …\nA private or extension tag\nAn unknown extension sample format\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.")