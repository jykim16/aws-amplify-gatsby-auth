import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Select, Input } from '@amzn/awsui-components-react';

const Page = () => {
  const options = useStaticQuery(graphql`
    query {
      allArchitectures {
        edges {
          node {
            id
            name
            services
          }
        }
      }
    }
  `)
  let architectureOptions = options.allArchitectures.edges.map(architecture => {
    return {
      label: architecture.node.name,
      value: architecture.node.id
    }
  })
  const [selectedArch, setArch] = useState(architectureOptions[0]);
  const [reflectInput, setReflect] = useState("");
  const [reflectedInput, setReflected] = useState("");
  async function onUpdateReflect(event) {
    console.log(event.detail.value)
    setReflect(event.detail.value)
    let response = await fetch(`https://86qg7pg1oi.execute-api.us-east-1.amazonaws.com/reflect?input=${event.detail.value}`);
    if (response.ok) {
      let text = await response.text()
      // console.log(text)
      setReflected(text);
    }
  }
  console.log(selectedArch)
  return (
    <main>
      <h1>Architecture Selection</h1>
      <p>
        This is an example of data being brought into a static page at build time
        powered by Gatsby
      </p>
      {/* <Link to="/about">About</Link> */}

      <Select options={architectureOptions} selectedOption={selectedArch} onChange={event=>setArch(event.detail.selectedOption)} selectedLabel="Selected"></Select>
      Services:
      <p>
      {JSON.stringify(options.allArchitectures.edges[parseInt(selectedArch.value)].node.services)}
      </p>

      <h1>adder api call</h1>
      <Input
        onChange={onUpdateReflect}
        value={reflectInput}
      />

      <p>{reflectedInput}</p>
    </main>
  );
};

export default Page;
