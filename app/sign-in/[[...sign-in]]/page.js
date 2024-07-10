import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="hero-content text-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;