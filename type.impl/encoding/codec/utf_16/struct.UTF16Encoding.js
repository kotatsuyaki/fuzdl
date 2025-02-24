(function() {
    var type_impls = Object.fromEntries([["encoding",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-UTF16Encoding%3CE%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#72\">Source</a><a href=\"#impl-Clone-for-UTF16Encoding%3CE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"encoding/codec/utf_16/struct.UTF16Encoding.html\" title=\"struct encoding::codec::utf_16::UTF16Encoding\">UTF16Encoding</a>&lt;E&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#72\">Source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; <a class=\"struct\" href=\"encoding/codec/utf_16/struct.UTF16Encoding.html\" title=\"struct encoding::codec::utf_16::UTF16Encoding\">UTF16Encoding</a>&lt;E&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.85.0/src/core/clone.rs.html#174\">Source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: &amp;Self)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.85.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","encoding::codec::utf_16::UTF16LEEncoding","encoding::codec::utf_16::UTF16BEEncoding"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Encoding-for-UTF16Encoding%3CE%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#87-92\">Source</a><a href=\"#impl-Encoding-for-UTF16Encoding%3CE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E: Endian&gt; <a class=\"trait\" href=\"encoding/types/trait.Encoding.html\" title=\"trait encoding::types::Encoding\">Encoding</a> for <a class=\"struct\" href=\"encoding/codec/utf_16/struct.UTF16Encoding.html\" title=\"struct encoding::codec::utf_16::UTF16Encoding\">UTF16Encoding</a>&lt;E&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.name\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#88\">Source</a><a href=\"#method.name\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#tymethod.name\" class=\"fn\">name</a>(&amp;self) -&gt; &amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a></h4></section></summary><div class='docblock'>Returns the canonical name of given encoding.\nThis name is guaranteed to be unique across built-in encodings,\nbut it is not normative and would be at most arbitrary.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.whatwg_name\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#89\">Source</a><a href=\"#method.whatwg_name\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#method.whatwg_name\" class=\"fn\">whatwg_name</a>(&amp;self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>&gt;</h4></section></summary><div class='docblock'>Returns a name of given encoding defined in the WHATWG Encoding standard, if any.\nThis name often differs from <code>name</code> due to the compatibility reason.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.raw_encoder\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#90\">Source</a><a href=\"#method.raw_encoder\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#tymethod.raw_encoder\" class=\"fn\">raw_encoder</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.85.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"encoding/types/trait.RawEncoder.html\" title=\"trait encoding::types::RawEncoder\">RawEncoder</a>&gt;</h4></section></summary><div class='docblock'>Creates a new encoder.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.raw_decoder\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#91\">Source</a><a href=\"#method.raw_decoder\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#tymethod.raw_decoder\" class=\"fn\">raw_decoder</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.85.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"encoding/types/trait.RawDecoder.html\" title=\"trait encoding::types::RawDecoder\">RawDecoder</a>&gt;</h4></section></summary><div class='docblock'>Creates a new decoder.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encode\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/types.rs.html#204-207\">Source</a><a href=\"#method.encode\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#method.encode\" class=\"fn\">encode</a>(\n    &amp;self,\n    input: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>,\n    trap: <a class=\"enum\" href=\"encoding/types/enum.EncoderTrap.html\" title=\"enum encoding::types::EncoderTrap\">EncoderTrap</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.85.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.u8.html\">u8</a>&gt;, <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/alloc/borrow/enum.Cow.html\" title=\"enum alloc::borrow::Cow\">Cow</a>&lt;'static, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>&gt;&gt;</h4></section></summary><div class='docblock'>An easy-to-use interface to <code>RawEncoder</code>.\nOn the encoder error <code>trap</code> is called,\nwhich may return a replacement sequence to continue processing,\nor a failure to return the error.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encode_to\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/types.rs.html#210-243\">Source</a><a href=\"#method.encode_to\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#method.encode_to\" class=\"fn\">encode_to</a>(\n    &amp;self,\n    input: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>,\n    trap: <a class=\"enum\" href=\"encoding/types/enum.EncoderTrap.html\" title=\"enum encoding::types::EncoderTrap\">EncoderTrap</a>,\n    ret: &amp;mut dyn <a class=\"trait\" href=\"encoding/types/trait.ByteWriter.html\" title=\"trait encoding::types::ByteWriter\">ByteWriter</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/alloc/borrow/enum.Cow.html\" title=\"enum alloc::borrow::Cow\">Cow</a>&lt;'static, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>&gt;&gt;</h4></section></summary><div class='docblock'>Encode into a <code>ByteWriter</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.decode\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/types.rs.html#249-252\">Source</a><a href=\"#method.decode\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#method.decode\" class=\"fn\">decode</a>(\n    &amp;self,\n    input: &amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.u8.html\">u8</a>],\n    trap: <a class=\"enum\" href=\"encoding/types/enum.DecoderTrap.html\" title=\"enum encoding::types::DecoderTrap\">DecoderTrap</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.85.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>, <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/alloc/borrow/enum.Cow.html\" title=\"enum alloc::borrow::Cow\">Cow</a>&lt;'static, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>&gt;&gt;</h4></section></summary><div class='docblock'>An easy-to-use interface to <code>RawDecoder</code>.\nOn the decoder error <code>trap</code> is called,\nwhich may return a replacement string to continue processing,\nor a failure to return the error.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.decode_to\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/encoding/types.rs.html#258-291\">Source</a><a href=\"#method.decode_to\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"encoding/types/trait.Encoding.html#method.decode_to\" class=\"fn\">decode_to</a>(\n    &amp;self,\n    input: &amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.u8.html\">u8</a>],\n    trap: <a class=\"enum\" href=\"encoding/types/enum.DecoderTrap.html\" title=\"enum encoding::types::DecoderTrap\">DecoderTrap</a>,\n    ret: &amp;mut dyn <a class=\"trait\" href=\"encoding/types/trait.StringWriter.html\" title=\"trait encoding::types::StringWriter\">StringWriter</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"https://doc.rust-lang.org/1.85.0/alloc/borrow/enum.Cow.html\" title=\"enum alloc::borrow::Cow\">Cow</a>&lt;'static, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.85.0/std/primitive.str.html\">str</a>&gt;&gt;</h4></section></summary><div class='docblock'>Decode into a <code>StringWriter</code>. <a href=\"encoding/types/trait.Encoding.html#method.decode_to\">Read more</a></div></details></div></details>","Encoding","encoding::codec::utf_16::UTF16LEEncoding","encoding::codec::utf_16::UTF16BEEncoding"],["<section id=\"impl-Copy-for-UTF16Encoding%3CE%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/encoding/codec/utf_16.rs.html#72\">Source</a><a href=\"#impl-Copy-for-UTF16Encoding%3CE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.85.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.85.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> for <a class=\"struct\" href=\"encoding/codec/utf_16/struct.UTF16Encoding.html\" title=\"struct encoding::codec::utf_16::UTF16Encoding\">UTF16Encoding</a>&lt;E&gt;</h3></section>","Copy","encoding::codec::utf_16::UTF16LEEncoding","encoding::codec::utf_16::UTF16BEEncoding"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[12908]}