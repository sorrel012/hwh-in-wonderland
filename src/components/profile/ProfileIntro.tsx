import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Wrapper = styled.main`
  background: ${(props) => props.theme.profile.bgColor};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Introduction = styled.section`
  height: 50vh;
  padding: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.profile.titleColor};
  z-index: 99;
`;

const Overview = styled.section`
  flex: 9;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 4vw;
  line-height: 1.3;
`;

const Content = styled.h3`
  font-size: 2.5vw;
  line-height: 1.5;
  margin-top: 5%;
`;

const WaveBox = styled.div`
  opacity: 0.6;
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #015871;
`;

const Wave = styled.div`
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);

  &:nth-of-type(2) {
    top: -175px;
    animation:
      wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      swell 7s ease -1.25s infinite;
    opacity: 1;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }

  @keyframes swell {
    0%,
    100% {
      transform: translate3d(0, -25px, 0);
    }
    50% {
      transform: translate3d(0, 5px, 0);
    }
  }
`;

function ProfileIntro() {
  const data = useStaticQuery(graphql`
    query ProfileIntro {
      allContentfulProfile {
        edges {
          node {
            mainPic {
              gatsbyImageData(placeholder: BLURRED)
            }
            title
            content {
              content
            }
          }
        }
      }
    }
  `);

  const { mainPic, title, content } = data.allContentfulProfile.edges[0].node;
  const titleArr = title.split('.');

  return (
    <Wrapper>
      <Introduction>
        <GatsbyImage
          image={mainPic?.gatsbyImageData as any}
          alt="mainPic"
          className="pic-main"
        />
        <Overview>
          {titleArr.map((text: string) => (
            <Title key={text}>{text}</Title>
          ))}
          <Content>{content?.content}</Content>
        </Overview>
      </Introduction>
      <WaveBox>
        <Wave />
        <Wave />
      </WaveBox>
    </Wrapper>
  );
}

export default ProfileIntro;
