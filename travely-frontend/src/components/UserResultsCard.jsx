
// Submits the user as a property
function UserResultsCard({ user }) {
  return (
    <div className="user-results-card">
      {" "}
      <h2>Game result summary</h2>{" "}
      <p>
        {" "}
        <strong>Name:</strong> {user.name}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong>Email:</strong> {user.email}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong>Password:</strong> ••••••••{" "}
      </p>{" "}
    </div>
  );
}
export default UserResultsCard;
