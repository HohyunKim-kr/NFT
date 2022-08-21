import React from "react";
import { useState } from "react";
import Web3 from "web3";
import nftABI from "./abi/nftABI";
import { pinFileToIPFS } from "./pinata";

const CA = "0x8309D9d0284bBcdC769be2b374C2bC8C810324A8";

function App() {
  const [myAddress, setMyAddress] = useState();
  const [contract, setContract] = useState();
  const [file, setFile] = useState();

  const connect = async () => {
    if (!window.ethereum) alert("메타마스크 설치해!");
    const web3 = new Web3(window.ethereum);
    const [address] = await window.ethereum.enable();
    setMyAddress(address);
    // ganache contract 연결(ABI, CA) -> 메타마스크도 ganache와 연결되어 있어야 함
    const contract = new web3.eth.Contract(nftABI, CA);
    // contract 셋팅
    setContract(contract);
  };

  const mint = () => {
    const bitImage =
      "https://cdn.econovill.com/news/photo/202208/586170_512357_24.jpg";
    contract.methods.safeMint(myAddress, bitImage).send({
      from: myAddress,
      gas: 3000000,
    });
  };

  const _onChange = (e) => {
    setFile(e.target.files[0]);
  };
  const upload = async () => {
    const result = await pinFileToIPFS(file);
    const metadata = {
      name: "MyFile",
      description: "My File is Good",
      image: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      attributes: [],
    };
  };
  return (
    <div>
      {myAddress ? (
        <div>{myAddress}</div>
      ) : (
        <button onClick={connect}>지갑연결</button>
      )}
      <div>
        <div>
          <input type="file" onChange={_onChange} />
          <button onClick={upload}>upload</button>
        </div>
        <button onClick={mint}>Mint</button>
      </div>
    </div>
  );
}

export default App;
