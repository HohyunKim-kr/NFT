import axios from "axios";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjVmZjQxZC05YTRjLTQ4YzEtYjg1ZS0wZjZjOTI4OTNjOTAiLCJlbWFpbCI6ImhvaHl1bjEwMjJAbmF2ZXIuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk1YzJmZDE2YjgyZDRjYjQ1MDA0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNGViNDNmMmQyZGZkMmUwMDk5OGQ5YTgzY2U4MzcyNDNiMTBjMDFkZGJhODE5ZmVhOGNlYmU4MzY3MTY3N2MzNiIsImlhdCI6MTY2MTA5OTA1OH0.soAeSTKTyROXbvLvwUwM2rapBKD1NGtKR7jtmmv_uVE";

export const pinFileToIPFS = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("pinataOptions", '{"cidVersion": 1}');
  data.append(
    "pinataMetadata",
    '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
  );

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    headers: { Authorization: `Bearer ${JWT}` },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};

export const pinJSONToIPFS = async (json) => {
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataContent: json,
  });

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
    data: data,
  };

  const res = await axios(config);

  console.log(res.data);
};
