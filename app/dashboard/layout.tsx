import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { SidebarTrigger, SidebarProvider } from "@/src/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* <SidebarTrigger className='lg:hidden' /> */}
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default layout