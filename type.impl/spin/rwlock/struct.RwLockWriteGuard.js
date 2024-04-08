(function() {var type_impls = {
"spin":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#618-695\">source</a><a href=\"#impl-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>, R&gt; <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.downgrade\" class=\"method\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#632-645\">source</a><h4 class=\"code-header\">pub fn <a href=\"spin/rwlock/struct.RwLockWriteGuard.html#tymethod.downgrade\" class=\"fn\">downgrade</a>(self) -&gt; <a class=\"struct\" href=\"spin/rwlock/struct.RwLockReadGuard.html\" title=\"struct spin::rwlock::RwLockReadGuard\">RwLockReadGuard</a>&lt;'rwlock, T&gt;</h4></section></summary><div class=\"docblock\"><p>Downgrades the writable lock guard to a readable, shared lock guard. Cannot fail and is guaranteed not to spin.</p>\n\n<div class=\"example-wrap\"><pre class=\"rust rust-example-rendered\"><code><span class=\"kw\">let </span>mylock = spin::RwLock::new(<span class=\"number\">0</span>);\n\n<span class=\"kw\">let </span><span class=\"kw-2\">mut </span>writable = mylock.write();\n<span class=\"kw-2\">*</span>writable = <span class=\"number\">1</span>;\n\n<span class=\"kw\">let </span>readable = writable.downgrade(); <span class=\"comment\">// This is guaranteed not to spin\n</span><span class=\"macro\">assert_eq!</span>(<span class=\"kw-2\">*</span>readable, <span class=\"number\">1</span>);</code></pre></div>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.downgrade_to_upgradeable\" class=\"method\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#659-675\">source</a><h4 class=\"code-header\">pub fn <a href=\"spin/rwlock/struct.RwLockWriteGuard.html#tymethod.downgrade_to_upgradeable\" class=\"fn\">downgrade_to_upgradeable</a>(self) -&gt; <a class=\"struct\" href=\"spin/rwlock/struct.RwLockUpgradableGuard.html\" title=\"struct spin::rwlock::RwLockUpgradableGuard\">RwLockUpgradableGuard</a>&lt;'rwlock, T, R&gt;</h4></section></summary><div class=\"docblock\"><p>Downgrades the writable lock guard to an upgradable, shared lock guard. Cannot fail and is guaranteed not to spin.</p>\n\n<div class=\"example-wrap\"><pre class=\"rust rust-example-rendered\"><code><span class=\"kw\">let </span>mylock = spin::RwLock::new(<span class=\"number\">0</span>);\n\n<span class=\"kw\">let </span><span class=\"kw-2\">mut </span>writable = mylock.write();\n<span class=\"kw-2\">*</span>writable = <span class=\"number\">1</span>;\n\n<span class=\"kw\">let </span>readable = writable.downgrade_to_upgradeable(); <span class=\"comment\">// This is guaranteed not to spin\n</span><span class=\"macro\">assert_eq!</span>(<span class=\"kw-2\">*</span>readable, <span class=\"number\">1</span>);</code></pre></div>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.leak\" class=\"method\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#690-694\">source</a><h4 class=\"code-header\">pub fn <a href=\"spin/rwlock/struct.RwLockWriteGuard.html#tymethod.leak\" class=\"fn\">leak</a>(this: Self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.reference.html\">&amp;'rwlock mut T</a></h4></section></summary><div class=\"docblock\"><p>Leak the lock guard, yielding a mutable reference to the underlying data.</p>\n<p>Note that this function will permanently lock the original lock.</p>\n\n<div class=\"example-wrap\"><pre class=\"rust rust-example-rendered\"><code><span class=\"kw\">let </span>mylock = spin::RwLock::new(<span class=\"number\">0</span>);\n\n<span class=\"kw\">let </span>data: <span class=\"kw-2\">&amp;mut </span>i32 = spin::RwLockWriteGuard::leak(mylock.write());\n\n<span class=\"kw-2\">*</span>data = <span class=\"number\">1</span>;\n<span class=\"macro\">assert_eq!</span>(<span class=\"kw-2\">*</span>data, <span class=\"number\">1</span>);</code></pre></div>\n</div></details></div></details>",0,"spin::RwLockWriteGuard"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-DerefMut-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#733-737\">source</a><a href=\"#impl-DerefMut-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/ops/deref/trait.DerefMut.html\" title=\"trait core::ops::deref::DerefMut\">DerefMut</a> for <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deref_mut\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#734-736\">source</a><a href=\"#method.deref_mut\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/ops/deref/trait.DerefMut.html#tymethod.deref_mut\" class=\"fn\">deref_mut</a>(&amp;mut self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.reference.html\">&amp;mut T</a></h4></section></summary><div class='docblock'>Mutably dereferences the value.</div></details></div></details>","DerefMut","spin::RwLockWriteGuard"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#697-701\">source</a><a href=\"#impl-Debug-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#698-700\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","spin::RwLockWriteGuard"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Drop-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#756-764\">source</a><a href=\"#impl-Drop-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/ops/drop/trait.Drop.html\" title=\"trait core::ops::drop::Drop\">Drop</a> for <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.drop\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#757-763\">source</a><a href=\"#method.drop\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/ops/drop/trait.Drop.html#tymethod.drop\" class=\"fn\">drop</a>(&amp;mut self)</h4></section></summary><div class='docblock'>Executes the destructor for this type. <a href=\"https://doc.rust-lang.org/1.77.1/core/ops/drop/trait.Drop.html#tymethod.drop\">Read more</a></div></details></div></details>","Drop","spin::RwLockWriteGuard"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deref-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#725-731\">source</a><a href=\"#impl-Deref-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/ops/deref/trait.Deref.html\" title=\"trait core::ops::deref::Deref\">Deref</a> for <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Target\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Target\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"https://doc.rust-lang.org/1.77.1/core/ops/deref/trait.Deref.html#associatedtype.Target\" class=\"associatedtype\">Target</a> = T</h4></section></summary><div class='docblock'>The resulting type after dereferencing.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.deref\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#728-730\">source</a><a href=\"#method.deref\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/ops/deref/trait.Deref.html#tymethod.deref\" class=\"fn\">deref</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.reference.html\">&amp;T</a></h4></section></summary><div class='docblock'>Dereferences the value.</div></details></div></details>","Deref","spin::RwLockWriteGuard"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Display-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#703-707\">source</a><a href=\"#impl-Display-for-RwLockWriteGuard%3C'rwlock,+T,+R%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'rwlock, T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>, R&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a> for <a class=\"struct\" href=\"spin/rwlock/struct.RwLockWriteGuard.html\" title=\"struct spin::rwlock::RwLockWriteGuard\">RwLockWriteGuard</a>&lt;'rwlock, T, R&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/spin/rwlock.rs.html#704-706\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html#tymethod.fmt\">Read more</a></div></details></div></details>","Display","spin::RwLockWriteGuard"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()