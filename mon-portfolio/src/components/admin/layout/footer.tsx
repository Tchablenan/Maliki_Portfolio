export function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5 text-sm text-muted-foreground">
          <span>{new Date().getFullYear()} © Portfolio du Dr Maliki Djandjieme</span>
          <a href="/fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            Voir le site public
          </a>
        </div>
      </div>
    </footer>
  );
}
