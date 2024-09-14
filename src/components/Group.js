
function Group({ onClick, group }) {
  return (
    <form onSubmit={(event) => onClick(event)}>
      <label>To compare stats, use the same group ID</label> <br/>
      <input type='text' defaultValue={group}/> <br/>
      <input type='submit' value='Use group ID'/>
    </form>
  );
}

export default Group;
