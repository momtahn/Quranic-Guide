import Logo from './Logo';

const Header = () => {
  return (
    <header className="py-8 text-center">
      <div className="container mx-auto flex items-center justify-center space-x-3">
        <Logo className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Quranic Guide
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Ask questions and receive guidance based on the Quran and the teachings of Prophet Muhammad (peace be upon him).
      </p>
    </header>
  );
};

export default Header;
