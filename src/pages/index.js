import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Select } from '@amzn/awsui-components-react';

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
    </main>
  );
};

export default Page;
