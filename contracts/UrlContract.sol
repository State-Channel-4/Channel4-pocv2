// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract UrlContract {
    
    struct URL {
        string title;
        string url;
        address submittedBy;
        uint256 upvotes;
        uint256 downvotes;
        string[] tagIds;
    }
    
    struct Tag {
        string name;
        address createdBy;
        uint256[] urlIds;
    }
    
    struct User {
        uint256[] upvotedURLs;
        uint256[] downvotedURLs;
        uint256[] submittedURLs;
    }
    
    URL[] private urls;
    Tag[] private tags;
    mapping (address => User) private users;
    
    function createTagIfNotExists(string memory tagName) internal returns (uint256) {
        for (uint256 i = 0; i < tags.length; i++) {
            if (keccak256(bytes(tags[i].name)) == keccak256(bytes(tagName))) {
                return i;
            }
        }
        Tag memory newTag = Tag(tagName, msg.sender, new uint256[](0));
        tags.push(newTag);
        return tags.length - 1;
    }
    
    function submitURL(string memory title, string memory url, string[] memory tagIds) public {
        require(bytes(title).length > 0 && bytes(url).length > 0 && tagIds.length > 0, "Invalid input");
        uint256[] memory tagIndexes = new uint256[](tagIds.length);
        for (uint256 i = 0; i < tagIds.length; i++) {
            tagIndexes[i] = createTagIfNotExists(tagIds[i]);
        }
        URL memory newURL = URL(title, url, msg.sender, 0, 0, tagIds);
        urls.push(newURL);
        for (uint256 i = 0; i < tagIndexes.length; i++) {
            tags[tagIndexes[i]].urlIds.push(urls.length - 1);
        }
    }
    
    function getURLsByTag(string memory tagId) public view returns (URL[] memory) {
        bool tagFound = false;
        uint256[] memory urlIds = new uint256[](0);
        for (uint256 i = 0; i < tags.length; i++) {
            if (keccak256(bytes(tags[i].name)) == keccak256(bytes(tagId))) {
                tagFound = true;
                urlIds = tags[i].urlIds;
                break;
            }
        }
        require(tagFound, "Tag not found");
        URL[] memory result = new URL[](urlIds.length);
        for (uint256 i = 0; i < urlIds.length; i++) {
            result[i] = urls[urlIds[i]];
        }
        return result;
    }
    
    function getAllURLs() public view returns (URL[] memory) {
        return urls;
    }
    
    function getURLsByUser(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userSubmittedURLs = users[userAddress].submittedURLs;
        URL[] memory result = new URL[](userSubmittedURLs.length);
        for (uint256 i = 0; i < userSubmittedURLs.length; i++) {
            result[i] = urls[userSubmittedURLs[i]];
        }
        return result;
    }

    
    function getURL(uint256 index) public view returns (URL memory) {
        require(index < urls.length, "Invalid URL index");
        return urls[index];
    }
    
    function getTag(uint256 index) public view returns (Tag memory) {
        require(index < tags.length, "Invalid Tag index");
        return tags[index];
    }
    
    function getUserUpvotedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userUpvotedURLs = users[userAddress].upvotedURLs;
        URL[] memory result = new URL[](userUpvotedURLs.length);
        for (uint256 i = 0; i < userUpvotedURLs.length; i++) {
            result[i] = urls[userUpvotedURLs[i]];
        }
        return result;
    }
    
    function getUserDownvotedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userDownvotedURLs = users[userAddress].downvotedURLs;
        URL[] memory result = new URL[](userDownvotedURLs.length);
        for (uint256 i = 0; i < userDownvotedURLs.length; i++) {
            result[i] = urls[userDownvotedURLs[i]];
        }
        return result;
    }
    
    function getUserSubmittedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userSubmittedURLs = users[userAddress].submittedURLs;
        URL[] memory result = new URL[](userSubmittedURLs.length);
        for (uint256 i = 0; i < userSubmittedURLs.length; i++) {
            result[i] = urls[userSubmittedURLs[i]];
        }
        return result;
    }
}
