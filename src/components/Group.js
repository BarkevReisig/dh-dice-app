
function Group({ onClick }) {
  return (
    <form onSubmit={(event) => onClick(event)}>
      <label>To compare stats with friends, use the same group id</label> <br/>
      <input type='text'/> <br/>
      <input type='submit' value='Use group ID'/>
    </form>
  );
}

export default Group;
