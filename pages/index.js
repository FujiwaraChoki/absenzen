import Hero from '@/components/Hero';
import LoginModal from '@/components/Login';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {
  const [logout, setLogout] = useState(false);
  const router = useRouter();

  const isLogout = router.query.logout;

  useEffect(() => {
    if (isLogout === "true") {
      setLogout(true);
    }
  }, [isLogout]);

  /*useEffect(() => {
    // Go to bottom wihtout animation
    window.scrollTo(0, document.body.scrollHeight);
  });*/

  return (
    <div>
      <Hero logout={logout} />
      <LoginModal />
    </div>
  );
}

export default Home;
