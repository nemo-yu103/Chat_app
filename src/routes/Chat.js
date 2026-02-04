const Chat = () => {
  const testDataUsers = [
    {
      id: 1,
      name: "nemoto",
    },
    {
      id: 2,
      name: "itou",
    },
  ];

  const testDataMessages = [
    {
      text: "msg1",
      userid: 1,
    },
    {
      text: "msg2",
      userid: 2,
    },
    {
      text: "msg3",
      userid: 1,
    },
  ];

  const getMessages = async () => {
    const asd = await fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "testteate", groupId: 1, userId: 1 }),
    });
    console.log(asd);
  };

  return (
    <div>
      <div>
        asdasdsa
        {/** ここにちゃっと入れて */}
        <button onClick={getMessages}>insert message</button>
      </div>
    </div>
  );
};

export default Chat;
