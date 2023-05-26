import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { firstTag } from "../constants";

describe("UrlContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployUrlContractFixture(){
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();

    const UrlContract = await ethers.getContractFactory("UrlContract");
    const urlContract = await UrlContract.deploy(firstTag);

    return { urlContract, owner, otherAccount1, otherAccount2 };
  }

  async function submitURLFixture(){
    const { urlContract, owner, otherAccount1, otherAccount2 } = await loadFixture(deployUrlContractFixture);
    const title = "Google";
    const url = "https://www.google.com/";
    const tags = [firstTag, "web search"];
    const urlObj = { title, url, tags };
    await urlContract.connect(otherAccount1).submitURL(
      urlObj.title,
      urlObj.url,
      urlObj.tags,
    );
    return { urlContract, owner, otherAccount1, otherAccount2, urlObj };
  }

  async function likeURLFixture(){
    const { urlContract, owner, otherAccount1, otherAccount2, urlObj } = await loadFixture(submitURLFixture);
    await urlContract.connect(otherAccount1).likeURL(0);
    return { urlContract, owner, otherAccount1, otherAccount2, urlObj };
  }


  describe("Deployment", function () {
    it("Should have one element in tags array", async function () {
      const { urlContract, owner } = await loadFixture(deployUrlContractFixture);
      const allTags = await urlContract.getAllTags();
      const firstTagObject = allTags[0];

      expect( allTags.length ).to.equal(1);
      expect( firstTagObject.name ).to.equal(firstTag);
      expect( firstTagObject.createdBy ).to.equal(owner.address);
      expect( firstTagObject.urlIds.length).to.equal(0);
    });

    it("Should have no elements in urls array", async function () {
      const { urlContract } = await loadFixture(deployUrlContractFixture);
      const allUrls = await urlContract.getAllURLs();

      expect( allUrls.length ).to.equal(0);
    });
  });


  describe("Submit URL", async function () {
    it("Should successfully submit a URL", async function () {
      const { urlContract, urlObj } = await loadFixture(submitURLFixture);

      const allUrls = await urlContract.getAllURLs();
      const allTags = await urlContract.getAllTags();
      const firstTagObject = allTags[0];
      expect( allUrls.length ).to.equal(1);
      expect( allTags.length ).to.equal(urlObj.tags.length); // keep in mind that firstTag is included

      const urlIdsInFirstTag = firstTagObject.urlIds;

      expect( urlIdsInFirstTag.length ).to.equal(1);
      expect( urlIdsInFirstTag[0] ).to.equal(allUrls.length - 1); // check for url ids
    });

    it("Should have the correct URL object attributes", async function () {
      const { urlContract, otherAccount1, urlObj } = await loadFixture(submitURLFixture);

      const allUrls = await urlContract.getAllURLs();
      const firstUrlObject = allUrls[0];

      expect( firstUrlObject.title ).to.equal(urlObj.title);
      expect( firstUrlObject.url ).to.equal(urlObj.url);
      expect( firstUrlObject.submittedBy ).to.equal(otherAccount1.address);
      expect( firstUrlObject.tagIds.length ).to.equal(urlObj.tags.length);
      // check tag ids are correct
      for (let i = 0, ni = urlObj.tags.length; i<ni; i++){
        expect( firstUrlObject.tagIds[i].toNumber() ).to.equal(i);
      }
    });

    it("Should not add new tags if they already exist", async function () {
      const { urlContract, urlObj } = await loadFixture(submitURLFixture);

      const allTags = await urlContract.getAllTags();
      expect( allTags.length ).to.equal(urlObj.tags.length);
    });

  });

  describe("Like a URL", async function () {
    it("Should successfully like a URL", async function () {
      const { urlContract, otherAccount1 } = await loadFixture(likeURLFixture);

      const url = await urlContract.getURL(0);
      expect( url.likes.toNumber() ).to.equal(1);

      const userLikedURLs = await urlContract.getUserLikedURLs(otherAccount1.address);
      expect( userLikedURLs.length ).to.equal(1);
      expect (userLikedURLs[0].likes.toNumber() ).to.equal(1);

    });
  });
});
