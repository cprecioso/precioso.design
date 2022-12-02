import { useRouter } from "next/router"
import { createContext, ReactNode, useContext, useMemo } from "react"

const makeFormatters = (locale: string | undefined) => ({
  dateFormatter: new Intl.DateTimeFormat(locale),
})

const FormattersContext = createContext<ReturnType<
  typeof makeFormatters
> | null>(null)

export const FormattersProvider = ({ children }: { children?: ReactNode }) => {
  const { locale } = useRouter()
  const formatters = useMemo(() => makeFormatters(locale), [locale])
  return (
    <FormattersContext.Provider value={formatters}>
      {children}
    </FormattersContext.Provider>
  )
}

export const useFormatters = () => {
  const value = useContext(FormattersContext)
  if (value == null) throw new Error("No FormattersProvider in the tree")
  return value
}

export const DateFormatter = ({
  children: rawDate,
}: {
  children: number | Date
}) => {
  const date = new Date(rawDate)
  const { dateFormatter } = useFormatters()
  return <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
}
