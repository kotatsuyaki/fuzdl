searchState.loadedDescShard("indicatif", 0, "indicatif is a library for Rust that helps you build …\nFinishes the progress bar and leaves the current message …\nFinishes the progress bar and sets a message, and leaves …\nFinishes the progress bar and completely clears it (this …\nFinishes the progress bar and leaves the current message\nFormats bytes for human readability using ISO/IEC prefixes\nFormats bytes for human readability using SI prefixes\nWraps an std duration for human basic formatting.\nFormats bytes for human readability\nFormats counts for human readability using commas\nWraps an std duration for human readable formatting.\nManages multiple progress bars from different threads\nVertical alignment of a multi progress.\nA progress bar or spinner\nWraps an iterator to display its progress.\nTarget for draw operations\nBehavior of a progress bar when it is finished\nWraps an iterator to display its progress.\nThe state of a progress bar at a moment in time.\nA trait for minimal terminal-like behavior.\nA weak reference to a <code>ProgressBar</code>.\nFinishes the progress bar and sets a message\nFinishes the progress bar and leaves the current message …\nFinishes the progress bar and sets a message, and leaves …\nAdds a progress bar.\nClear the current line and reset the cursor to beginning …\nUndoes <code>ProgressBar::enable_steady_tick()</code>\nCreates a new weak reference to this <code>ProgressBar</code>\nThe expected total duration (that is, elapsed time + …\nReturns the current expected duration\nReturns the current elapsed time\nSpawns a background thread to tick the progress bar\nThe expected ETA\nReturns the current ETA\nFinishes the progress bar and leaves the current message\nFinishes the progress bar and completely clears it\nFinishes the progress bar using the behavior stored in the …\nFinishes the progress bar and sets a message\nReturns the completion as a floating-point number between …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nA hidden draw target.\nCreates a completely hidden progress bar\nAdvances the position of the progress bar by <code>delta</code>\nIncrease the length of the progress bar\nInserts a progress bar.\nInserts a progress bar after an existing one.\nInserts a progress bar before an existing one.\nInserts a progress bar from the back.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nIndicates that the progress bar finished.\nIndicates that the progress bar finished\nReturns true if the draw target is hidden.\nA quick convenience check if the progress bar is hidden\nReturns the current length\nCurrent message\nMove the cursor down by <code>n</code> lines\nMove the cursor left by <code>n</code> lines\nMove the cursor right by <code>n</code> lines\nMove the cursor up by <code>n</code> lines\nCreates a new multi progress object.\nCreates a new progress bar with a given length\nCreate a new <code>WeakProgressBar</code> that returns <code>None</code> when <code>upgrade</code>…\nCreates a new spinner\nThe number of steps per second\nReturns the current rate of progress\nReturns the current position\nCurrent prefix\nPrint a log line above all progress bars in the …\nPrint a log line above the progress bar\nWrap an iterator with default styling.\nWrap an iterator with default styling.\nWrap an iterator with an explicit element count.\nWrap an iterator with an explicit element count.\nWrap an iterator with a custom progress bar.\nWrap an iterator with a progress bar and style it.\nWrap an iterator with a progress bar and style it.\nRemoves a progress bar.\nResets all of the progress bar state\nResets elapsed time\nResets the ETA calculation\nSet alignment flag\nSets a different draw target for the multiprogress bar.\nSets a different draw target for the progress bar\nSets the length of the progress bar\nSets the current message of the progress bar\nSet whether we should try to move the cursor when possible …\nSets the position of the progress bar\nSets the current prefix of the progress bar\nOverrides the stored style\nSets the tab width (default: 8). All tabs will be expanded …\nDraw to a buffered stderr terminal at a max of 15 times a …\nDraw to a buffered stderr terminal at a max of <code>refresh_rate</code>…\nDraw to a buffered stdout terminal at a max of 15 times a …\nDraw to a buffered stdout terminal at a max of <code>refresh_rate</code>…\nGet a clone of the current progress bar style.\nHide all progress bars temporarily, execute <code>f</code>, then redraw …\nHide the progress bar temporarily, execute <code>f</code>, then redraw …\nDraw to a terminal, optionally with a specific refresh …\nDraw to a boxed object that implements the <code>TermLike</code> trait.\nManually ticks the spinner or progress bar\nWrap an iterator with default styling. Uses …\nWrap an iterator with default styling. Uses …\nUpdate the <code>ProgressBar</code>’s inner <code>ProgressState</code>\nAttempts to upgrade the Weak pointer to a <code>ProgressBar</code>, …\nReturn the terminal width\nCreates a new multi progress object with the given draw …\nCreates a new progress bar with a given length and draw …\nBuilder-like function for setting underlying progress bar…\nA convenience builder-like function for a progress bar …\nSets the finish behavior for the progress bar\nBuilder-like function for setting underlying progress bar…\nA convenience builder-like function for a progress bar …\nBuilder-like function for setting underlying progress bar…\nA convenience builder-like function for a progress bar …\nBuilder-like function for setting underlying progress bar…\nA convenience builder-like function for a progress bar …\nBuilder-like function for setting underlying progress bar…\nA convenience builder-like function for a progress bar …\nA convenience builder-like function for a progress bar …\nWraps an <code>Iterator</code> with the progress bar\nWraps an <code>io::Read</code> with the progress bar\nWraps an <code>io::Write</code> with the progress bar\nWrite a string and add a newline.\nWrite a string\nTrait for defining stateful or stateless formatters\nCreates a new instance of the progress tracker\nReturns the default progress bar style for bars\nReturns the default progress bar style for spinners\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the tick string for the finished state\nReturns the tick string for a given number\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSets the progress characters <code>(filled, current, to do)</code>\nNotifies the progress tracker of a reset event\nSets the template string for the progress bar\nNotifies the progress tracker of a tick event\nSets the tick character sequence for spinners\nSets the tick string sequence for spinners\nAdds a custom key that owns a <code>ProgressTracker</code> to the …\nProvides access to the progress bar display buffer for …")