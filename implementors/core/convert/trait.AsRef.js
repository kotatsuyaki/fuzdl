(function() {var implementors = {
"anyhow":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + 'static&gt; for <a class=\"struct\" href=\"anyhow/struct.Error.html\" title=\"struct anyhow::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + 'static&gt; for <a class=\"struct\" href=\"anyhow/struct.Error.html\" title=\"struct anyhow::Error\">Error</a>"]],
"bytes":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"bytes/struct.Bytes.html\" title=\"struct bytes::Bytes\">Bytes</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"bytes/struct.BytesMut.html\" title=\"struct bytes::BytesMut\">BytesMut</a>"]],
"crossbeam_epoch":[["impl&lt;T:&nbsp;?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a> + <a class=\"trait\" href=\"crossbeam_epoch/trait.Pointable.html\" title=\"trait crossbeam_epoch::Pointable\">Pointable</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;T&gt; for <a class=\"struct\" href=\"crossbeam_epoch/struct.Owned.html\" title=\"struct crossbeam_epoch::Owned\">Owned</a>&lt;T&gt;"]],
"either":[["impl&lt;L, R, Target&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;Target&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;Target&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;Target&gt;,</span>"],["impl&lt;L, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt;,</span>"],["impl&lt;L, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt;,</span>"],["impl&lt;L, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt;,</span>"],["impl&lt;L, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/core/ffi/c_str/struct.CStr.html\" title=\"struct core::ffi::c_str::CStr\">CStr</a>&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/core/ffi/c_str/struct.CStr.html\" title=\"struct core::ffi::c_str::CStr\">CStr</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/core/ffi/c_str/struct.CStr.html\" title=\"struct core::ffi::c_str::CStr\">CStr</a>&gt;,</span>"],["impl&lt;L, R, Target&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.slice.html\">[Target]</a>&gt; for <a class=\"enum\" href=\"either/enum.Either.html\" title=\"enum either::Either\">Either</a>&lt;L, R&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.slice.html\">[Target]</a>&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.slice.html\">[Target]</a>&gt;,</span>"]],
"fantoccini":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"fantoccini/elements/struct.ElementRef.html\" title=\"struct fantoccini::elements::ElementRef\">ElementRef</a>"]],
"futures_util":[["impl&lt;T:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt;&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"futures_util/io/struct.Window.html\" title=\"struct futures_util::io::Window\">Window</a>&lt;T&gt;"]],
"http":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"http/header/struct.HeaderName.html\" title=\"struct http::header::HeaderName\">HeaderName</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"http/header/struct.HeaderName.html\" title=\"struct http::header::HeaderName\">HeaderName</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"http/header/struct.HeaderValue.html\" title=\"struct http::header::HeaderValue\">HeaderValue</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"http/method/struct.Method.html\" title=\"struct http::method::Method\">Method</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"http/uri/struct.Authority.html\" title=\"struct http::uri::Authority\">Authority</a>"],["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"http/uri/struct.Port.html\" title=\"struct http::uri::Port\">Port</a>&lt;T&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt;,</span>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"http/uri/struct.Scheme.html\" title=\"struct http::uri::Scheme\">Scheme</a>"]],
"hyper":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"hyper/ext/struct.ReasonPhrase.html\" title=\"struct hyper::ext::ReasonPhrase\">ReasonPhrase</a>"]],
"mime":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"mime/struct.Mime.html\" title=\"struct mime::Mime\">Mime</a>"],["impl&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"mime/struct.Name.html\" title=\"struct mime::Name\">Name</a>&lt;'a&gt;"]],
"regex_syntax":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"regex_syntax/hir/literal/struct.Literal.html\" title=\"struct regex_syntax::hir::literal::Literal\">Literal</a>"]],
"ring":[["impl&lt;A&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/aead/struct.Aad.html\" title=\"struct ring::aead::Aad\">Aad</a>&lt;A&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;A: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt;,</span>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/aead/struct.Tag.html\" title=\"struct ring::aead::Tag\">Tag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.array.html\">[</a><a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a><a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.array.html\">; 12]</a>&gt; for <a class=\"struct\" href=\"ring/aead/struct.Nonce.html\" title=\"struct ring::aead::Nonce\">Nonce</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/agreement/struct.PublicKey.html\" title=\"struct ring::agreement::PublicKey\">PublicKey</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/digest/struct.Digest.html\" title=\"struct ring::digest::Digest\">Digest</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/hmac/struct.Tag.html\" title=\"struct ring::hmac::Tag\">Tag</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/pkcs8/struct.Document.html\" title=\"struct ring::pkcs8::Document\">Document</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/signature/struct.RsaSubjectPublicKey.html\" title=\"struct ring::signature::RsaSubjectPublicKey\">RsaSubjectPublicKey</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"ring/signature/struct.Signature.html\" title=\"struct ring::signature::Signature\">Signature</a>"]],
"rustls":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"rustls/struct.Certificate.html\" title=\"struct rustls::Certificate\">Certificate</a>"]],
"smallvec":[["impl&lt;A:&nbsp;<a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[&lt;A as <a class=\"trait\" href=\"smallvec/trait.Array.html\" title=\"trait smallvec::Array\">Array</a>&gt;::<a class=\"associatedtype\" href=\"smallvec/trait.Array.html#associatedtype.Item\" title=\"type smallvec::Array::Item\">Item</a>]&gt; for <a class=\"struct\" href=\"smallvec/struct.SmallVec.html\" title=\"struct smallvec::SmallVec\">SmallVec</a>&lt;A&gt;"]],
"tempfile":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"struct\" href=\"tempfile/struct.TempDir.html\" title=\"struct tempfile::TempDir\">TempDir</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"struct\" href=\"tempfile/struct.TempPath.html\" title=\"struct tempfile::TempPath\">TempPath</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt; for <a class=\"struct\" href=\"tempfile/struct.TempPath.html\" title=\"struct tempfile::TempPath\">TempPath</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"struct\" href=\"tempfile/struct.NamedTempFile.html\" title=\"struct tempfile::NamedTempFile\">NamedTempFile</a>"]],
"time":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/time/struct.Instant.html\" title=\"struct std::time::Instant\">Instant</a>&gt; for <a class=\"struct\" href=\"time/struct.Instant.html\" title=\"struct time::Instant\">Instant</a>"]],
"tinyvec":[["impl&lt;A:&nbsp;<a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[&lt;A as <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt;::<a class=\"associatedtype\" href=\"tinyvec/trait.Array.html#associatedtype.Item\" title=\"type tinyvec::Array::Item\">Item</a>]&gt; for <a class=\"struct\" href=\"tinyvec/struct.ArrayVec.html\" title=\"struct tinyvec::ArrayVec\">ArrayVec</a>&lt;A&gt;"],["impl&lt;'s, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/core/primitive.slice.html\">[T]</a>&gt; for <a class=\"struct\" href=\"tinyvec/struct.SliceVec.html\" title=\"struct tinyvec::SliceVec\">SliceVec</a>&lt;'s, T&gt;"],["impl&lt;A:&nbsp;<a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[&lt;A as <a class=\"trait\" href=\"tinyvec/trait.Array.html\" title=\"trait tinyvec::Array\">Array</a>&gt;::<a class=\"associatedtype\" href=\"tinyvec/trait.Array.html#associatedtype.Item\" title=\"type tinyvec::Array::Item\">Item</a>]&gt; for <a class=\"enum\" href=\"tinyvec/enum.TinyVec.html\" title=\"enum tinyvec::TinyVec\">TinyVec</a>&lt;A&gt;"]],
"tokio":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.TcpStream.html\" title=\"struct tokio::net::TcpStream\">TcpStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/tcp/struct.ReadHalf.html\" title=\"struct tokio::net::tcp::ReadHalf\">ReadHalf</a>&lt;'_&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.TcpStream.html\" title=\"struct tokio::net::TcpStream\">TcpStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/tcp/struct.WriteHalf.html\" title=\"struct tokio::net::tcp::WriteHalf\">WriteHalf</a>&lt;'_&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.TcpStream.html\" title=\"struct tokio::net::TcpStream\">TcpStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/tcp/struct.OwnedReadHalf.html\" title=\"struct tokio::net::tcp::OwnedReadHalf\">OwnedReadHalf</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.TcpStream.html\" title=\"struct tokio::net::TcpStream\">TcpStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/tcp/struct.OwnedWriteHalf.html\" title=\"struct tokio::net::tcp::OwnedWriteHalf\">OwnedWriteHalf</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.UnixStream.html\" title=\"struct tokio::net::UnixStream\">UnixStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/unix/struct.ReadHalf.html\" title=\"struct tokio::net::unix::ReadHalf\">ReadHalf</a>&lt;'_&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.UnixStream.html\" title=\"struct tokio::net::UnixStream\">UnixStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/unix/struct.WriteHalf.html\" title=\"struct tokio::net::unix::WriteHalf\">WriteHalf</a>&lt;'_&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.UnixStream.html\" title=\"struct tokio::net::UnixStream\">UnixStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/unix/struct.OwnedReadHalf.html\" title=\"struct tokio::net::unix::OwnedReadHalf\">OwnedReadHalf</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"tokio/net/struct.UnixStream.html\" title=\"struct tokio::net::UnixStream\">UnixStream</a>&gt; for <a class=\"struct\" href=\"tokio/net/unix/struct.OwnedWriteHalf.html\" title=\"struct tokio::net::unix::OwnedWriteHalf\">OwnedWriteHalf</a>"]],
"tracing_core":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"tracing_core/struct.Field.html\" title=\"struct tracing_core::Field\">Field</a>"]],
"url":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"url/struct.Url.html\" title=\"struct url::Url\">Url</a>"]],
"webpki":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.str.html\">str</a>&gt; for <a class=\"struct\" href=\"webpki/struct.DnsName.html\" title=\"struct webpki::DnsName\">DnsName</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.65.0/std/primitive.u8.html\">u8</a>]&gt; for <a class=\"struct\" href=\"webpki/struct.DnsNameRef.html\" title=\"struct webpki::DnsNameRef\">DnsNameRef</a>&lt;'_&gt;"]],
"which":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"struct\" href=\"which/struct.Path.html\" title=\"struct which::Path\">Path</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt; for <a class=\"struct\" href=\"which/struct.Path.html\" title=\"struct which::Path\">Path</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/path/struct.Path.html\" title=\"struct std::path::Path\">Path</a>&gt; for <a class=\"struct\" href=\"which/struct.CanonicalPath.html\" title=\"struct which::CanonicalPath\">CanonicalPath</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.65.0/std/ffi/os_str/struct.OsStr.html\" title=\"struct std::ffi::os_str::OsStr\">OsStr</a>&gt; for <a class=\"struct\" href=\"which/struct.CanonicalPath.html\" title=\"struct which::CanonicalPath\">CanonicalPath</a>"]],
"zeroize":[["impl&lt;T, Z&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;T&gt; for <a class=\"struct\" href=\"zeroize/struct.Zeroizing.html\" title=\"struct zeroize::Zeroizing\">Zeroizing</a>&lt;Z&gt;<span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;Z: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.65.0/core/convert/trait.AsRef.html\" title=\"trait core::convert::AsRef\">AsRef</a>&lt;T&gt; + <a class=\"trait\" href=\"zeroize/trait.Zeroize.html\" title=\"trait zeroize::Zeroize\">Zeroize</a>,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()