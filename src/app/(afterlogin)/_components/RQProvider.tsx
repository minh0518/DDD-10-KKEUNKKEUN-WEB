'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactChildrenProps } from '@/types/common';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retryOnMount: true,
        refetchOnReconnect: false,
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: ReactChildrenProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
    </QueryClientProvider>
  );
}

// function RQProvider({ children }: { children: ReactNode }) {
//   const [client] = useState(
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           refetchOnWindowFocus: false,
//           retryOnMount: true,
//           refetchOnReconnect: false,
//           retry: false,
//         },
//       },
//     }),
//   );

//   return (
//     <QueryClientProvider client={client}>
//       {children}
//       <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
//     </QueryClientProvider>
//   );
// }

// export default RQProvider;
