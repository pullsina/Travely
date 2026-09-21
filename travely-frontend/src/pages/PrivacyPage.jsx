import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import backgroundMap from "../assets/background_map.png";
import "./PrivacyPage.css";

const sections = [
  ["Who is responsible?", [
    "Travely is operated by [name of the person or organisation responsible for personal data]. For privacy questions or requests, contact [privacy contact email].",
  ]],
  ["Information we use", [
    "When you create an account, we collect your username, the email address you enter and your password. Account credentials are handled through our authentication system.",
    "We also save game progress and results linked to your account, including points, completed questions, correct or incorrect answers, hints used and completion dates.",
    "Passwords are stored as salted, one-way hashes using ASP.NET Core Identity, rather than as readable passwords.",
    "The current application includes diagnostic logging on the server and in the browser. Browser diagnostic messages can include account information and sign-in results.",
    "[Hosting and production logging settings still need to be checked to confirm whether IP addresses or other request information are retained, who has access to those logs and how long they are kept.]",
  ]],
  ["Why we use this information", [
    "We use your email address only as an account sign-in identifier. We do not use it for newsletters or marketing.",
    "We use account information to provide access to Travely, and game results to save progress and display your scores.",
    "[Confirm and state the applicable GDPR legal basis for each purpose. Do not assume that registering an account constitutes consent to every use of personal data.]",
  ]],
  ["Email addresses and account identifiers", [
    "The current version allows an email-formatted identifier that does not correspond to a real mailbox. Please do not enter another person's email address. A fictional identifier does not necessarily make an account anonymous: account activity and other associated information may still be personal data.",
    "Travely does not verify email addresses, offer account recovery or send service emails. You cannot recover your account by email if you forget your login details.",
  ]],
  ["Browser storage", [
    "Travely uses browser storage and authentication cookies to support sign-in and retain app state, such as the current question or practice progress.",
    "[Confirm the storage and cookies used in production, their purposes and expiry periods, and whether any analytics or optional tracking is enabled.]",
  ]],
  ["Service providers and access", [
    "[Identify hosting, database and other providers that process account information, explain their role and state whether data is transferred outside the EU/EEA. Where relevant, describe the safeguards for those transfers.]",
  ]],
  ["How long information is kept", [
    "[Specify how long account information, results, logs and backups are retained, or the criteria used to determine those periods. Describe what happens when an account is deleted.]",
  ]],
  ["Your rights", [
    "Depending on the circumstances, you can request access to your personal data, correction of inaccurate information, deletion, restriction of processing, or a portable copy of your data. You may also have the right to object to certain processing. Where processing relies on consent, you may withdraw that consent.",
    "To exercise your rights, contact [privacy contact email]. We may need to verify that the account belongs to you before acting on a request.",
  ]],
  ["Changes to this policy", [
    "We will update this policy when the way we handle personal data changes and show the updated date here.",
  ]],
];

function PrivacyPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="privacy-page" style={{ backgroundImage: `url(${backgroundMap})` }}>
      <Navbar variant={isAuthenticated ? "app" : "guest"} showAuthLinks={!isAuthenticated} />
      <article className="privacy-page__content" aria-labelledby="privacy-title">
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>Draft prepared: 21 September 2026</p>
        <p className="privacy-page__notice">Draft: this policy is incomplete. Bracketed details still need to be confirmed before it is finalised.</p>
        {sections.map(([title, paragraphs]) => (
          <section key={title}>
            <h2>{title}</h2>
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {title === "Your rights" && <p>You can also complain to the <a href="https://www.imy.se/">Swedish Authority for Privacy Protection (IMY)</a>.</p>}
          </section>
        ))}
        <section>
          <h2>Before publication</h2>
          <ul>
            <li>Complete all bracketed items and verify them against the deployed service.</li>
            <li>Confirm whether children are intended users and whether additional information or protections are needed.</li>
            <li>Link the completed policy from the footer and registration form.</li>
          </ul>
          <p><a href="https://www.imy.se/vanliga-fragor-och-svar/vad-ska-en-integritetspolicy-innehalla/">IMY guidance on privacy policies</a></p>
        </section>
      </article>
    </main>
  );
}

export default PrivacyPage;
