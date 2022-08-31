window.SIDEBAR_ITEMS = {"struct":[["CollectPixels","Specifies how to collect all the specified channels into a number of individual pixels."],["OptionalSampleReader","Reader for a single channel. Generic over the concrete sample type (f16, f32, u32). Can also skip reading a channel if it could not be found in the image."],["ReadOptionalChannel","Used to read another specific channel from an image. Contains the previous `ReadChannels` objects."],["ReadRequiredChannel","Used to read another specific channel from an image. Contains the previous `ReadChannels` objects."],["SampleReader","Reader for a single channel. Generic over the concrete sample type (f16, f32, u32)."],["SpecificChannelsReader","The reader that holds the temporary data that is required to read some specified channels."]],"trait":[["ReadSpecificChannel","Can be attached one more channel reader. Call `required` or `optional` on this object to declare another channel to be read from the file. Call `collect_pixels` at last to define how the previously declared pixels should be stored."],["RecursivePixelReader","A reader containing sub-readers for reading the pixel content of an image."]],"type":[["ReadZeroChannels","Read zero channels from an image. Call `with_named_channel` on this object to read as many channels as desired."]]};