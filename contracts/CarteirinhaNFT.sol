// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact andersoncampolina1@gmail.com
contract CarteirinhaNFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("CarteirinhaNFT", "CNFT") {}

    // Mapping owner address to Historico[]
    mapping(address => Historico[]) private _historico;
    // cria array/objeto historico
    struct Historico {
        string nomeConquista;
        uint128 dataConquista;
        uint128 idConquista;        
    }

    Historico[] public historico;

    function adicionarConquistaHistorico(string memory nomeConquista_, uint128 dataConquista_, uint128 idConquista_) public onlyOwner {
        historico.push(Historico(nomeConquista_, dataConquista_, idConquista_));
    }

    function consultarHistorico() public view returns(Historico[] memory) {
        return historico;
    }

    function safeMint(address to) public onlyOwner {
        //require(_tokenIdCounter.current() < 1);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}