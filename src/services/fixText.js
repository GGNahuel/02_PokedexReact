export function fixedText (text = '', firstLetterMayus = true) {
  if ((typeof text) !== 'string') return text

  if (firstLetterMayus) {
    const firstLetter = text.charAt(0).toUpperCase()
    text = firstLetter + text.slice(1)
  }
  const newText = text.replace(/[-_]|\f|(\\n)/g, ' ')
  return newText
}
