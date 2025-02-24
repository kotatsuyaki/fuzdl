searchState.loadedDescShard("socket2", 0, "Utilities for creating and using sockets.\nAn address assigned to an interface.\nType corresponding to <code>SOCK_DGRAM</code>.\nSpecification of the communication domain for a socket.\nProtocol corresponding to <code>ICMPv4</code>.\nProtocol corresponding to <code>ICMPv6</code>.\nDomain for IPv4 communication, corresponding to <code>AF_INET</code>.\nDomain for IPv6 communication, corresponding to <code>AF_INET6</code>.\nAn interface index.\nA local interface specified by its index or an address …\nA version of <code>IoSliceMut</code> that allows the buffer to be …\nDomain for low-level packet interface, corresponding to …\nProtocol specification used for creating sockets via …\nType corresponding to <code>SOCK_RAW</code>.\nFlags for incoming messages.\nType corresponding to <code>SOCK_SEQPACKET</code>.\nType corresponding to <code>SOCK_STREAM</code>.\nThe address of a socket.\nA reference to a <code>Socket</code> that can be used to configure …\nOwned wrapper around a system socket.\nProtocol corresponding to <code>TCP</code>.\nConfigures a socket’s TCP keepalive parameters.\nSpecification of communication semantics on a socket.\nProtocol corresponding to <code>UDP</code>.\nDomain for Unix socket communication, corresponding to …\nDomain for low-level VSOCK interface, corresponding to …\nAccept a new incoming connection from this listener.\nAccept a new incoming connection from this listener.\nAccept a new incoming connection from this listener.\nReturns a raw pointer to the address.\nReturns this address as a <code>SocketAddr</code> if it is in the …\nReturns this address as a <code>SocketAddrV4</code> if it is in the …\nReturns this address as a <code>SocketAddrV6</code> if it is in the …\nAttach Berkeley Packet Filter(BPF) on this socket.\nBinds this socket to the specified address.\nSets the value for the <code>SO_BINDTODEVICE</code> option on this …\nGet the value of the <code>SO_BROADCAST</code> option for this socket.\nSet <code>SOCK_CLOEXEC</code> on the <code>Type</code>.\nInitiate a connection on this socket to the specified …\nInitiate a connection on this socket to the specified …\nGet the value of the <code>TCP_CORK</code> option on this socket.\nGet the value of the <code>SO_INCOMING_CPU</code> option on this socket.\nDetach Berkeley Packet Filter(BPF) from this socket.\nGets the value for the <code>SO_BINDTODEVICE</code> option on this …\nReturns the <code>Domain</code> of this socket by checking the <code>SO_DOMAIN</code>…\nReturns this address’s family.\nReturns the correct domain for <code>address</code>.\nGet the value of the <code>IP_FREEBIND</code> option on this socket.\nGet the value of the <code>IPV6_FREEBIND</code> option on this socket.\nReturns the argument unchanged.\nThe caller must ensure <code>S</code> is actually a socket.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet the value of the <code>IP_HDRINCL</code> option on this socket.\nInitialise a <code>SockAddr</code> by calling the function <code>init</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGet the value of the <code>IP_TRANSPARENT</code> option on this socket.\nCheck if the message terminates a record.\nReturns <code>true</code> if <code>listen(2)</code> was called on this socket by …\nCheck if the message contains out-of-band data.\nCheck if the message contains a truncated datagram.\nJoin a multicast group using <code>IP_ADD_MEMBERSHIP</code> option on …\nJoin a multicast group using <code>IP_ADD_MEMBERSHIP</code> option on …\nJoin a multicast group using <code>IPV6_ADD_MEMBERSHIP</code> option on …\nJoin a multicast SSM channel using <code>IP_ADD_SOURCE_MEMBERSHIP</code>…\nGet the value of the <code>SO_KEEPALIVE</code> option on this socket.\nGet the value of the <code>TCP_KEEPINTVL</code> option on this socket.\nGet the value of the <code>TCP_KEEPCNT</code> option on this socket.\nGet the value of the <code>TCP_KEEPIDLE</code> option on this socket.\nLeave a multicast group using <code>IP_DROP_MEMBERSHIP</code> option on …\nLeave a multicast group using <code>IP_DROP_MEMBERSHIP</code> option on …\nLeave a multicast group using <code>IPV6_DROP_MEMBERSHIP</code> option …\nLeave a multicast group using <code>IP_DROP_SOURCE_MEMBERSHIP</code> …\nReturns the size of this address in bytes.\nGet the value of the <code>SO_LINGER</code> option on this socket.\nMark a socket as ready to accept incoming connection …\nReturns the socket address of the local half of this …\nGets the value for the <code>SO_MARK</code> option on this socket.\nGets the value of the <code>TCP_MAXSEG</code> option on this socket.\nGet the value of the <code>IPV6_MULTICAST_HOPS</code> option for this …\nGet the value of the <code>IP_MULTICAST_IF</code> option for this …\nGet the value of the <code>IPV6_MULTICAST_IF</code> option for this …\nGet the value of the <code>IP_MULTICAST_LOOP</code> option for this …\nGet the value of the <code>IPV6_MULTICAST_LOOP</code> option for this …\nGet the value of the <code>IP_MULTICAST_TTL</code> option for this …\nCreates a new socket and sets common flags.\nCreates a new <code>MaybeUninitSlice</code> wrapping a byte slice.\nCreate a <code>SockAddr</code> from the underlying storage and its …\nReturns a new, empty set of TCP keepalive parameters.\nCreates a new socket ready to be configured.\nGet the value of the <code>TCP_NODELAY</code> option on this socket.\nSet <code>SOCK_NONBLOCK</code> on the <code>Type</code>.\nGet the value of the <code>IPV6_V6ONLY</code> option for this socket.\nGet value for the <code>SO_OOBINLINE</code> option on this socket.\nCreates a pair of sockets which are connected to each …\nCreates a pair of sockets which are connected to each …\nReceives data on the socket from the remote adress to …\nReceives data from the socket, without removing it from …\nReturns the socket address of the remote peer of this …\nReturns the <code>Protocol</code> of this socket by checking the …\nGet the value of the <code>TCP_QUICKACK</code> option on this socket.\nGet value for the <code>SO_RCVTIMEO</code> option on this socket.\nReceives data on the socket from the remote address to …\nGet value for the <code>SO_RCVBUF</code> option on this socket.\nReceives data from the socket. On success, returns the …\nReceives data from the socket. Returns the amount of bytes …\nIdentical to <code>recv_from_vectored</code> but allows for …\nIdentical to <code>recv_from</code> but allows for specification of …\nReceives out-of-band (OOB) data on the socket from the …\nGet the value of the <code>IP_RECVTOS</code> option for this socket.\nReceives data on the socket from the remote address to …\nIdentical to <code>recv_vectored</code> but allows for specification of …\nIdentical to <code>recv</code> but allows for specification of …\nGet the value of the <code>SO_REUSEADDR</code> option on this socket.\nGet the value of the <code>SO_REUSEPORT</code> option on this socket.\nSends data on the socket to a connected peer.\nGet the value of the <code>SO_SNDBUF</code> option on this socket.\nSends out-of-band (OOB) data on the socket to connected …\nSends data on the socket to the given address. On success, …\nSend data to a peer listening on <code>addr</code>. Returns the amount …\nIdentical to <code>send_to_vectored</code> but allows for specification …\nIdentical to <code>send_to</code> but allows for specification of …\nSend data to the connected peer. Returns the amount of …\nIdentical to <code>send_vectored</code> but allows for specification of …\nIdentical to <code>send</code> but allows for specification of …\nCopies data between a <code>file</code> and this socket using the …\nSet the value of the <code>SO_BROADCAST</code> option for this socket.\nSets <code>CLOEXEC</code> on the socket.\nSet the value of the <code>TCP_CORK</code> option on this socket.\nSet value for the <code>SO_INCOMING_CPU</code> option on this socket.\nSet value for the <code>IP_FREEBIND</code> option on this socket.\nSet value for the <code>IPV6_FREEBIND</code> option on this socket.\nSet the value of the <code>IP_HDRINCL</code> option on this socket.\nSet the value of the <code>IP_TRANSPARENT</code> option on this socket.\nSet value for the <code>SO_KEEPALIVE</code> option on this socket.\nSet value for the <code>SO_LINGER</code> option on this socket.\nSets the value for the <code>SO_MARK</code> option on this socket.\nSets the value of the <code>TCP_MAXSEG</code> option on this socket.\nSet the value of the <code>IPV6_MULTICAST_HOPS</code> option for this …\nSet the value of the <code>IP_MULTICAST_IF</code> option for this …\nSet the value of the <code>IPV6_MULTICAST_IF</code> option for this …\nSet the value of the <code>IP_MULTICAST_LOOP</code> option for this …\nSet the value of the <code>IPV6_MULTICAST_LOOP</code> option for this …\nSet the value of the <code>IP_MULTICAST_TTL</code> option for this …\nSet the value of the <code>TCP_NODELAY</code> option on this socket.\nMoves this TCP stream into or out of nonblocking mode.\nSets <code>SO_NOSIGPIPE</code> on the socket.\nSet the value for the <code>IPV6_V6ONLY</code> option on this socket.\nSet value for the <code>SO_OOBINLINE</code> option on this socket.\nSet the value of the <code>TCP_QUICKACK</code> option on this socket.\nSet value for the <code>SO_RCVTIMEO</code> option on this socket.\nSet value for the <code>SO_RCVBUF</code> option on this socket.\nSet the value of the <code>IP_RECVTOS</code> option for this socket.\nSet value for the <code>SO_REUSEADDR</code> option on this socket.\nSet value for the <code>SO_REUSEPORT</code> option on this socket.\nSet value for the <code>SO_SNDBUF</code> option on this socket.\nSet parameters configuring TCP keepalive probes for this …\nSet the value of the <code>TCP_USER_TIMEOUT</code> option on this …\nSet the value of the <code>TCP_THIN_LINEAR_TIMEOUTS</code> option on …\nSet the value of the <code>IP_TOS</code> option for this socket.\nSet the value of the <code>IP_TTL</code> option for this socket.\nSet the value for the <code>IPV6_UNICAST_HOPS</code> option on this …\nSet value for the <code>SO_SNDTIMEO</code> option on this socket.\nShuts down the read, write, or both halves of this …\nGet the value of the <code>SO_ERROR</code> option on this socket.\nGet the value of the <code>TCP_USER_TIMEOUT</code> option on this …\nGet the value of the <code>TCP_THIN_LINEAR_TIMEOUTS</code> option on …\nGet the value of the <code>IP_TOS</code> option for this socket.\nCreates a new independently owned handle to the underlying …\nGet the value of the <code>IP_TTL</code> option for this socket.\nReturns the <code>Type</code> of this socket by checking the <code>SO_TYPE</code> …\nGet the value of the <code>IPV6_UNICAST_HOPS</code> option for this …\nConstructs a <code>SockAddr</code> with the family <code>AF_UNIX</code> and the …\nConstructs a <code>SockAddr</code> with the family <code>AF_VSOCK</code> and the …\nReturns this address VSOCK CID/port if it is in the …\nSet the value of the <code>TCP_KEEPINTVL</code> option. On Windows, …\nSet the value of the <code>TCP_KEEPCNT</code> option.\nSet the amount of time after which TCP keepalive probes …\nGet value for the <code>SO_SNDTIMEO</code> option on this socket.")