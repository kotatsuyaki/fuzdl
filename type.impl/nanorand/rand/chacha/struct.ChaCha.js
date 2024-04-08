(function() {var type_impls = {
"nanorand":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#27-45\">source</a><a href=\"#impl-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#30-37\">source</a><h4 class=\"code-header\">pub fn <a href=\"nanorand/rand/chacha/struct.ChaCha.html#tymethod.new\" class=\"fn\">new</a>() -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Create a new <a href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\"><code>ChaCha</code></a> instance, seeding from the system’s default source of entropy.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.new_key\" class=\"method\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#41-44\">source</a><h4 class=\"code-header\">pub const fn <a href=\"nanorand/rand/chacha/struct.ChaCha.html#tymethod.new_key\" class=\"fn\">new_key</a>(key: [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.array.html\">32</a>], nonce: [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.array.html\">8</a>]) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Create a new <a href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\"><code>ChaCha</code></a> instance, using the provided key and nonce.</p>\n</div></details></div></details>",0,"nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Default-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#47-56\">source</a><a href=\"#impl-Default-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#48-55\">source</a><a href=\"#method.default\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html#tymethod.default\" class=\"fn\">default</a>() -&gt; Self</h4></section></summary><div class='docblock'>Returns the “default value” for a type. <a href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html#tymethod.default\">Read more</a></div></details></div></details>","Default","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Display-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#87-91\">source</a><a href=\"#impl-Display-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a> for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#88-90\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html#tymethod.fmt\">Read more</a></div></details></div></details>","Display","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Rng%3C64%3E-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#58-79\">source</a><a href=\"#impl-Rng%3C64%3E-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"nanorand/rand/trait.Rng.html\" title=\"trait nanorand::rand::Rng\">Rng</a>&lt;64&gt; for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.rand\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#59-78\">source</a><a href=\"#method.rand\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#tymethod.rand\" class=\"fn\">rand</a>(&amp;mut self) -&gt; [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.array.html\">64</a>]</h4></section></summary><div class='docblock'>Generates a random sequence of bytes, seeding from the internal state.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.generate\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand.rs.html#31-36\">source</a><a href=\"#method.generate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#method.generate\" class=\"fn\">generate</a>&lt;Generated&gt;(&amp;mut self) -&gt; Generated<div class=\"where\">where\n    Generated: <a class=\"trait\" href=\"nanorand/gen/trait.RandomGen.html\" title=\"trait nanorand::gen::RandomGen\">RandomGen</a>&lt;Self, OUTPUT&gt;,</div></h4></section></summary><div class='docblock'>Generates a random of the specified type, seeding from the internal state.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.fill_bytes\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand.rs.html#38-51\">source</a><a href=\"#method.fill_bytes\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#method.fill_bytes\" class=\"fn\">fill_bytes</a>&lt;Bytes&gt;(&amp;mut self, buffer: Bytes)<div class=\"where\">where\n    Bytes: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>]&gt;,</div></h4></section></summary><div class='docblock'>Fill an array of bytes with randomness.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.fill\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand.rs.html#53-60\">source</a><a href=\"#method.fill\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#method.fill\" class=\"fn\">fill</a>&lt;Contents, Array&gt;(&amp;mut self, target: Array)<div class=\"where\">where\n    Contents: <a class=\"trait\" href=\"nanorand/gen/trait.RandomGen.html\" title=\"trait nanorand::gen::RandomGen\">RandomGen</a>&lt;Self, OUTPUT&gt;,\n    Array: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.slice.html\">[Contents]</a>&gt;,</div></h4></section></summary><div class='docblock'>Fill an array with the specified type.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.generate_range\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand.rs.html#62-68\">source</a><a href=\"#method.generate_range\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#method.generate_range\" class=\"fn\">generate_range</a>&lt;Number, Bounds&gt;(&amp;mut self, range: Bounds) -&gt; Number<div class=\"where\">where\n    Number: <a class=\"trait\" href=\"nanorand/gen/trait.RandomRange.html\" title=\"trait nanorand::gen::RandomRange\">RandomRange</a>&lt;Self, OUTPUT&gt;,\n    Bounds: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/ops/range/trait.RangeBounds.html\" title=\"trait core::ops::range::RangeBounds\">RangeBounds</a>&lt;Number&gt;,</div></h4></section></summary><div class='docblock'>Generates a random of the specified type, seeding from the internal state.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.shuffle\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand.rs.html#70-80\">source</a><a href=\"#method.shuffle\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.Rng.html#method.shuffle\" class=\"fn\">shuffle</a>&lt;Contents, Array&gt;(&amp;mut self, target: Array)<div class=\"where\">where\n    Array: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.AsMut.html\" title=\"trait core::convert::AsMut\">AsMut</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.slice.html\">[Contents]</a>&gt;,</div></h4></section></summary><div class='docblock'>Shuffle a slice, using the RNG.</div></details></div></details>","Rng<64>","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#103-111\">source</a><a href=\"#impl-Debug-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#104-110\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#81-85\">source</a><a href=\"#impl-Clone-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#82-84\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; Self</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.77.1/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-SeedableRng%3C40,+64%3E-for-ChaCha%3CROUNDS%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#93-101\">source</a><a href=\"#impl-SeedableRng%3C40,+64%3E-for-ChaCha%3CROUNDS%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;const ROUNDS: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>&gt; <a class=\"trait\" href=\"nanorand/rand/trait.SeedableRng.html\" title=\"trait nanorand::rand::SeedableRng\">SeedableRng</a>&lt;40, 64&gt; for <a class=\"struct\" href=\"nanorand/rand/chacha/struct.ChaCha.html\" title=\"struct nanorand::rand::chacha::ChaCha\">ChaCha</a>&lt;ROUNDS&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.reseed\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/nanorand/rand/chacha.rs.html#94-100\">source</a><a href=\"#method.reseed\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"nanorand/rand/trait.SeedableRng.html#tymethod.reseed\" class=\"fn\">reseed</a>(&amp;mut self, seed: [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.array.html\">40</a>])</h4></section></summary><div class='docblock'>Re-seed the RNG with the specified bytes.</div></details></div></details>","SeedableRng<40, 64>","nanorand::rand::chacha::ChaCha8","nanorand::rand::chacha::ChaCha12","nanorand::rand::chacha::ChaCha20"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()