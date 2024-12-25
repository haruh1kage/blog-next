export default function script() {
  const defaultTheme = localStorage.getItem('theme');
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  
  if(defaultTheme === 'dark' || ((defaultTheme === 'system' || defaultTheme === null) && darkQuery.matches)) {
    document.documentElement.classList.add('dark')
  } else {
    if(document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
    }
  }
}
