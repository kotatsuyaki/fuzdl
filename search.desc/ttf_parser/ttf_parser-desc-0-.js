searchState.loadedDescShard("ttf_parser", 0, "A high-level, safe, zero-allocation TrueType font parser.\nA value of Class Definition Table.\nA font face handle.\nThe face index is larger than the number of faces in the …\nA list of font face parsing errors.\nParsed face tables.\nA glyph class.\nA type-safe wrapper for glyph ID.\nA line metrics.\nAn attempt to read out of bounds detected.\nA Name Record.\nAn iterator over font’s names.\nThe <code>head</code> table is missing or malformed.\nThe <code>hhea</code> table is missing or malformed.\nThe <code>maxp</code> table is missing or malformed.\nA variation coordinate in a normalized coordinate system.\nA trait for glyph outline construction.\nA platform ID.\nA glyph’s raster image.\nA glyph raster image format.\nA rectangle.\nA script metrics used by subscript and superscript.\nA table name.\nA 4-byte tag.\nFace data must start with <code>0x00010000</code>, <code>0x74727565</code>, …\nA font variation value.\nA font weight.\nA font width.\nReturns tag value as <code>u32</code> number.\nReturns a horizontal face ascender.\nAn axis tag name.\nReturns face’s capital height.\nReturns an iterator over character to glyph index mapping.\nAppends a ClosePath segment.\nA character to glyph index mapping table implementation.\nAppends a CurveTo segment.\nA raw image data. It’s up to the caller to decode it.\nReturns a horizontal face descender.\nReturns the platform-specific encoding ID.\nReturns the number of fonts stored in a TrueType font …\nAn image format.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreates a new coordinate.\nReturns the argument unchanged.\nCreates a new coordinate.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreates a <code>Tag</code> from bytes.\nCreates a <code>Tag</code> from bytes.\nCreates a new <code>Face</code> object from a raw data.\nCreates and parses face tables from an existing table …\nReturns the coordinate value as f2.14.\nReturns a bounding box that large enough to enclose any …\nReturns a tight glyph bounding box.\nReturns glyph’s class according to Glyph Class …\nReturns glyph’s horizontal advance.\nReturns glyph’s horizontal side bearing.\nResolves a Glyph ID for a code point.\nReturns glyph’s mark attachment class according to Mark …\nReturns glyph’s name.\nReturns a reference to a glyph’s raster image.\nReturns a reference to a glyph’s SVG image.\nResolves a variation of a Glyph ID from two code points.\nReturns glyph’s vertical advance.\nReturns glyph’s vertical side bearing.\nReturns glyph’s vertical origin according to Vertical …\nChecks that face has Glyph Class Definition Table.\nChecks that face has a specified table.\nReturns rect’s height.\nReturns face’s height.\nImage height.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks that face is marked as <em>Bold</em>.\nChecks that face is marked as <em>Italic</em>.\nChecks that glyph is a mark according to Mark Glyph Sets …\nChecks that face is marked as <em>Monospaced</em>.\nChecks if tag is null / <code>[0, 0, 0, 0]</code>.\nChecks that face is marked as <em>Oblique</em>.\nChecks that face is marked as <em>Regular</em>.\nChecks that the current Name data has a Unicode encoding.\nChecks that face is variable.\nReturns face’s italic angle.\nA kerning table implementation.\nReturns a iterator over kerning subtables.\nReturns the language ID.\nReturns a horizontal face line gap.\nAppends a LineTo segment.\nAppends a MoveTo segment.\nReturns the Name’s data as bytes.\nA list of name ID’s.\nReturns the Name ID.\nReturns an iterator over Name Records.\nReturns a total number of glyphs in the face.\nOutlines a glyph and returns its tight bounding box.\nBinary parsing utils.\nA pixels per em of the selected strike.\nReturns the platform ID.\nLine position.\nAppends a QuadTo segment.\nReturns face’s strikeout metrics.\nReturns face’s subscript metrics.\nReturns face’s superscript metrics.\nReturns the raw data of a selected table.\nLine thickness.\nReturns tag as 4-element byte array.\nReturns tag as 4-element byte array.\nConverts tag to lowercase.\nReturns a numeric representation of a weight.\nReturns a numeric representation of a width.\nConverts tag to uppercase.\nReturns a horizontal typographic face ascender.\nReturns a horizontal typographic face descender.\nReturns a horizontal typographic face line gap.\nReturns face’s underline metrics.\nReturns face’s units per EM.\nAn axis value.\nReturns a vertical face ascender.\nReturns a vertical face descender.\nReturns a vertical face height.\nReturns a vertical face line gap.\nReturns face’s weight.\nReturns rect’s width.\nReturns face’s width.\nImage width.\nHorizontal offset.\nReturns face’s x height.\nX offset.\nHorizontal font size.\nVertical offset.\nY offset.\nVertical font size.\nA character map encoding format.\nGlyph was found in the variation encoding table.\nA result of a variation glyph mapping.\nA character encoding subtable.\nAn iterator over character encoding subtables.\nGlyph should be looked in other, non-variation tables.\nCalls <code>f</code> for all codepoints contained in this subtable.\nReturns encoding ID.\nReturns encoding’s format.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nMaps a character to a glyph ID.\nResolves a variation of a glyph ID from two code points.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks that the current encoding is Unicode compatible.\nReturns encoding’s platform.\nA kerning subtable.\nAn iterator over kerning subtables.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns kerning for a pair of glyphs.\nChecks that subtable has a cross-stream values.\nChecks that subtable uses a state machine.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks that subtable is for horizontal text.\nChecks that subtable is variable.\nA 16-bit signed fixed number with the low 14 bits of …\nA 32-bit signed fixed-point number (16.16).\nA trait for parsing raw binary data.\nA slice-like container that converts internal binary data …\nA slice-like container that converts internal binary data …\nAn iterator over <code>LazyArray16</code>.\nAn iterator over <code>LazyArray32</code>.\nA safe u32 to usize casting.\nA common offset methods.\nA type-safe u16 offset.\nA type-safe u32 offset.\nObject’s raw data size.\nA streaming binary parser.\nJust like TryFrom, but for numeric types not supported by …\nA u24 number.\nAdvances by the specified <code>len</code>.\nAdvances by the specified <code>len</code> and checks for bounds.\nChecks that stream reached the end of the data.\nPerforms a binary search by specified <code>key</code>.\nPerforms a binary search by specified <code>key</code>.\nPerforms a binary search using specified closure.\nPerforms a binary search using specified closure.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns a value at <code>index</code>.\nReturns a value at <code>index</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks if array is empty.\nChecks that offset is null.\nJumps to the end of the stream.\nReturns the last value.\nReturns array’s length.\nReturns array’s length.\nCreates a new <code>LazyArray</code>.\nCreates a new <code>LazyArray</code>.\nCreates a new <code>Stream</code> parser.\nCreates a new <code>Stream</code> parser at offset.\nConverts u32 into usize.\nReturns the current offset.\nParses an object from a raw data.\nParses the type from the steam.\nReads the next <code>count</code> types as a slice.\nReads the next <code>count</code> types as a slice.\nParses the type from the steam at offset.\nReads N bytes from the stream.\nAdvances by <code>FromData::SIZE</code>.\nReturns array’s length.\nReturns the trailing data.\nConverts i16 to f32.\nConverts the offset to <code>usize</code>.\nCasts between numeric types.")