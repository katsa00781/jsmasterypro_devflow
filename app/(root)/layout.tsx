import React from 'react';

import Navbar from '@/components/ui/navigation/navbar/Index';

const RootLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default RootLayout