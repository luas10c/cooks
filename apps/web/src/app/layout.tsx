import './globals.css'

interface Props {
  children: React.ReactNode
}

const AppLayout = (props: Props) => {
  const { children } = props

  return (
    <html>
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  )
}

export default AppLayout