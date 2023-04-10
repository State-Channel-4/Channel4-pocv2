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
        uint256[] tagIds;
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
    
    URL[] public urls;
    Tag[] public tags;
    mapping (address => User) internal users;


    function getUpvotedURLs(address userAddress) public view returns (uint256[] memory) {
        return users[userAddress].upvotedURLs;
    }

    function getDownvotedURLs(address userAddress) public view returns (uint256[] memory) {
        return users[userAddress].downvotedURLs;
    }

    function getSubmittedURLs(address userAddress) public view returns (uint256[] memory) {
        return users[userAddress].submittedURLs;
    }

    function submitURL(string memory title, string memory url, uint256[] memory tagIds) public {
    require(bytes(title).length > 0 && bytes(url).length > 0 && tagIds.length > 0, "Invalid input");
    for (uint256 i = 0; i < tagIds.length; i++) {
        require(tagIds[i] < tags.length, "Invalid tag id");
    }
    URL memory newURL = URL(title, url, msg.sender, 0, 0, tagIds);
    urls.push(newURL);
    for (uint256 i = 0; i < tagIds.length; i++) {
        tags[tagIds[i]].urlIds.push(urls.length - 1);
    }
    users[msg.sender].submittedURLs.push(urls.length - 1);
}


    // function submitURL(string memory title, string memory url, uint256[] memory tagIds) public {
    //     require(bytes(title).length > 0 && bytes(url).length > 0 && tagIds.length > 0, "Invalid input");
    //     for (uint256 i = 0; i < tagIds.length; i++) {
    //         require(tagIds[i] < tags.length, "Invalid tag id");
    //     }
    //     URL memory newURL = URL(title, url, msg.sender, 0, 0, tagIds);
    //     urls.push(newURL);
    //     for (uint256 i = 0; i < tagIds.length; i++) {
    //         tags[tagIds[i]].urlIds.push(urls.length - 1);
    //     }
    // }
    
    function getURLsByTag(uint256 tagId) public view returns (URL[] memory) {
        require(tagId < tags.length, "Invalid tag id");
        uint256[] memory urlIds = tags[tagId].urlIds;
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
}
