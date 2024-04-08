(function() {var type_impls = {
"parking_lot":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#231\">source</a><a href=\"#impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#235\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.new\" class=\"fn\">new</a>(val: T) -&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;</h4></section></summary><div class=\"docblock\"><p>Creates a new reentrant mutex in an unlocked state ready for use.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.into_inner\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#264\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.into_inner\" class=\"fn\">into_inner</a>(self) -&gt; T</h4></section></summary><div class=\"docblock\"><p>Consumes this mutex, returning the underlying data.</p>\n</div></details></div></details>",0,"parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#269\">source</a><a href=\"#impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.const_new\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#276\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.const_new\" class=\"fn\">const_new</a>(\n    raw_mutex: R,\n    get_thread_id: G,\n    val: T\n) -&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;</h4></section></summary><div class=\"docblock\"><p>Creates a new reentrant mutex based on a pre-existing raw mutex and a\nhelper to get the thread ID.</p>\n<p>This allows creating a reentrant mutex in a constant context on stable\nRust.</p>\n</div></details></div></details>",0,"parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#289\">source</a><a href=\"#impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,\n    T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.lock\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#312\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.lock\" class=\"fn\">lock</a>(&amp;self) -&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutexGuard.html\" title=\"struct lock_api::remutex::ReentrantMutexGuard\">ReentrantMutexGuard</a>&lt;'_, R, G, T&gt;</h4></section></summary><div class=\"docblock\"><p>Acquires a reentrant mutex, blocking the current thread until it is able\nto do so.</p>\n<p>If the mutex is held by another thread then this function will block the\nlocal thread until it is available to acquire the mutex. If the mutex is\nalready held by the current thread then this function will increment the\nlock reference count and return immediately. Upon returning,\nthe thread is the only thread with the mutex held. An RAII guard is\nreturned to allow scoped unlock of the lock. When the guard goes out of\nscope, the mutex will be unlocked.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_lock\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#326\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.try_lock\" class=\"fn\">try_lock</a>(&amp;self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutexGuard.html\" title=\"struct lock_api::remutex::ReentrantMutexGuard\">ReentrantMutexGuard</a>&lt;'_, R, G, T&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Attempts to acquire this lock.</p>\n<p>If the lock could not be acquired at this time, then <code>None</code> is returned.\nOtherwise, an RAII guard is returned. The lock will be unlocked when the\nguard is dropped.</p>\n<p>This function does not block.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_mut\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#340\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.get_mut\" class=\"fn\">get_mut</a>(&amp;mut self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;mut T</a></h4></section></summary><div class=\"docblock\"><p>Returns a mutable reference to the underlying data.</p>\n<p>Since this call borrows the <code>ReentrantMutex</code> mutably, no actual locking needs to\ntake place—the mutable borrow statically guarantees no locks exist.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_locked\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#346\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.is_locked\" class=\"fn\">is_locked</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>Checks whether the mutex is currently locked.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_owned_by_current_thread\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#352\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.is_owned_by_current_thread\" class=\"fn\">is_owned_by_current_thread</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>Checks whether the mutex is currently held by the current thread.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.force_unlock\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#368\">source</a><h4 class=\"code-header\">pub unsafe fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.force_unlock\" class=\"fn\">force_unlock</a>(&amp;self)</h4></section></summary><div class=\"docblock\"><p>Forcibly unlocks the mutex.</p>\n<p>This is useful when combined with <code>mem::forget</code> to hold a lock without\nthe need to maintain a <code>ReentrantMutexGuard</code> object alive, for example when\ndealing with FFI.</p>\n<h5 id=\"safety\"><a class=\"doc-anchor\" href=\"#safety\">§</a>Safety</h5>\n<p>This method must only be called if the current thread logically owns a\n<code>ReentrantMutexGuard</code> but that guard has be discarded using <code>mem::forget</code>.\nBehavior is undefined if a mutex is unlocked when not locked.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.raw\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#382\">source</a><h4 class=\"code-header\">pub unsafe fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.raw\" class=\"fn\">raw</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;R</a></h4></section></summary><div class=\"docblock\"><p>Returns the underlying raw mutex object.</p>\n<p>Note that you will most likely need to import the <code>RawMutex</code> trait from\n<code>lock_api</code> to be able to call functions on the raw mutex.</p>\n<h5 id=\"safety-1\"><a class=\"doc-anchor\" href=\"#safety-1\">§</a>Safety</h5>\n<p>This method is unsafe because it allows unlocking a mutex while\nstill holding a reference to a <code>ReentrantMutexGuard</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.data_ptr\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#399\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.data_ptr\" class=\"fn\">data_ptr</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.pointer.html\">*mut T</a></h4></section></summary><div class=\"docblock\"><p>Returns a raw pointer to the underlying data.</p>\n<p>This is useful when combined with <code>mem::forget</code> to hold a lock without\nthe need to maintain a <code>ReentrantMutexGuard</code> object alive, for example\nwhen dealing with FFI.</p>\n<h5 id=\"safety-2\"><a class=\"doc-anchor\" href=\"#safety-2\">§</a>Safety</h5>\n<p>You must ensure that there are no data races when dereferencing the\nreturned pointer, for example if the current thread logically owns a\n<code>ReentrantMutexGuard</code> but that guard has been discarded using\n<code>mem::forget</code>.</p>\n</div></details></div></details>",0,"parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#443\">source</a><a href=\"#impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutexFair.html\" title=\"trait lock_api::mutex::RawMutexFair\">RawMutexFair</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,\n    T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.force_unlock_fair\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#456\">source</a><h4 class=\"code-header\">pub unsafe fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.force_unlock_fair\" class=\"fn\">force_unlock_fair</a>(&amp;self)</h4></section></summary><div class=\"docblock\"><p>Forcibly unlocks the mutex using a fair unlock protocol.</p>\n<p>This is useful when combined with <code>mem::forget</code> to hold a lock without\nthe need to maintain a <code>ReentrantMutexGuard</code> object alive, for example when\ndealing with FFI.</p>\n<h5 id=\"safety\"><a class=\"doc-anchor\" href=\"#safety\">§</a>Safety</h5>\n<p>This method must only be called if the current thread logically owns a\n<code>ReentrantMutexGuard</code> but that guard has be discarded using <code>mem::forget</code>.\nBehavior is undefined if a mutex is unlocked when not locked.</p>\n</div></details></div></details>",0,"parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#461\">source</a><a href=\"#impl-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutexTimed.html\" title=\"trait lock_api::mutex::RawMutexTimed\">RawMutexTimed</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,\n    T: ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_lock_for\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#468\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.try_lock_for\" class=\"fn\">try_lock_for</a>(\n    &amp;self,\n    timeout: &lt;R as <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutexTimed.html\" title=\"trait lock_api::mutex::RawMutexTimed\">RawMutexTimed</a>&gt;::<a class=\"associatedtype\" href=\"lock_api/mutex/trait.RawMutexTimed.html#associatedtype.Duration\" title=\"type lock_api::mutex::RawMutexTimed::Duration\">Duration</a>\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutexGuard.html\" title=\"struct lock_api::remutex::ReentrantMutexGuard\">ReentrantMutexGuard</a>&lt;'_, R, G, T&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Attempts to acquire this lock until a timeout is reached.</p>\n<p>If the lock could not be acquired before the timeout expired, then\n<code>None</code> is returned. Otherwise, an RAII guard is returned. The lock will\nbe unlocked when the guard is dropped.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_lock_until\" class=\"method\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#483\">source</a><h4 class=\"code-header\">pub fn <a href=\"lock_api/remutex/struct.ReentrantMutex.html#tymethod.try_lock_until\" class=\"fn\">try_lock_until</a>(\n    &amp;self,\n    timeout: &lt;R as <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutexTimed.html\" title=\"trait lock_api::mutex::RawMutexTimed\">RawMutexTimed</a>&gt;::<a class=\"associatedtype\" href=\"lock_api/mutex/trait.RawMutexTimed.html#associatedtype.Instant\" title=\"type lock_api::mutex::RawMutexTimed::Instant\">Instant</a>\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutexGuard.html\" title=\"struct lock_api::remutex::ReentrantMutexGuard\">ReentrantMutexGuard</a>&lt;'_, R, G, T&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Attempts to acquire this lock until a timeout is reached.</p>\n<p>If the lock could not be acquired before the timeout expired, then\n<code>None</code> is returned. Otherwise, an RAII guard is returned. The lock will\nbe unlocked when the guard is dropped.</p>\n</div></details></div></details>",0,"parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Default-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#529\">source</a><a href=\"#impl-Default-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#531\">source</a><a href=\"#method.default\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html#tymethod.default\" class=\"fn\">default</a>() -&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;</h4></section></summary><div class='docblock'>Returns the “default value” for a type. <a href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html#tymethod.default\">Read more</a></div></details></div></details>","Default","parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#543\">source</a><a href=\"#impl-Debug-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#544\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","parking_lot::remutex::ReentrantMutex"],["<section id=\"impl-Sync-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#226-227\">source</a><a href=\"#impl-Sync-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> for <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a>,\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section>","Sync","parking_lot::remutex::ReentrantMutex"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-From%3CT%3E-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#536\">source</a><a href=\"#impl-From%3CT%3E-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;T&gt; for <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.from\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#538\">source</a><a href=\"#method.from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html#tymethod.from\" class=\"fn\">from</a>(t: T) -&gt; <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;</h4></section></summary><div class='docblock'>Converts to this type from the input type.</div></details></div></details>","From<T>","parking_lot::remutex::ReentrantMutex"],["<section id=\"impl-Send-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lock_api/remutex.rs.html#222-223\">source</a><a href=\"#impl-Send-for-ReentrantMutex%3CR,+G,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;R, G, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> for <a class=\"struct\" href=\"lock_api/remutex/struct.ReentrantMutex.html\" title=\"struct lock_api::remutex::ReentrantMutex\">ReentrantMutex</a>&lt;R, G, T&gt;<div class=\"where\">where\n    R: <a class=\"trait\" href=\"lock_api/mutex/trait.RawMutex.html\" title=\"trait lock_api::mutex::RawMutex\">RawMutex</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,\n    G: <a class=\"trait\" href=\"lock_api/remutex/trait.GetThreadId.html\" title=\"trait lock_api::remutex::GetThreadId\">GetThreadId</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>,\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + ?<a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h3></section>","Send","parking_lot::remutex::ReentrantMutex"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()