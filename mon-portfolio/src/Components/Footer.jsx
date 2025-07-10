export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p className="text-xs">Built with React and Tailwind CSS</p>
      </div>
    </footer>
  );
}