import {expect} from 'chai';
import {capitalize, basename, dirname} from '../../src/utils/stringUtils';

describe('stringUtils', () => {

  describe('capitalize', () => {

    it('makes first letter in a string capital', () => {
      const text = 'a random string';

      expect(capitalize(text)).to.equal('A random string');
    });
  });

  describe('basename', () => {
    it('gets file.ext from /folder/subfolder/file.ext', () => {
      expect(basename('/folder/subfolder/file.ext')).to.equal('file.ext');
    });
    it('gets file.ext from folder/subfolder/file.ext', () => {
      expect(basename('folder/subfolder/file.ext')).to.equal('file.ext');
    });
    it('gets subfolder from /folder/subfolder/', () => {
      expect(basename('/folder/subfolder/')).to.equal('subfolder');
    });
    it('gets subfolder from /folder/subfolder', () => {
      expect(basename('/folder/subfolder')).to.equal('subfolder');
    });
    it('gets file.ext from /file.ext', () => {
      expect(basename('/file.ext')).to.equal('file.ext');
    });
    it('gets file.ext from file.ext', () => {
      expect(basename('file.ext')).to.equal('file.ext');
    });
    it('gets / from /', () => {
      expect(basename('/')).to.equal('/');
    });
    it('gets empty string from empty string', () => {
      expect(basename('')).to.equal('');
    });
  });

  describe('dirname', () => {
    it('gets /folder/subfolder from /folder/subfolder/file.ext', () => {
      expect(dirname('/folder/subfolder/file.ext')).to.equal('/folder/subfolder');
    });
    it('gets folder/subfolder/ from folder/subfolder/file.ext', () => {
      expect(dirname('folder/subfolder/file.ext')).to.equal('folder/subfolder');
    });
    it('gets /folder from /folder/subfolder/', () => {
      expect(dirname('/folder/subfolder/')).to.equal('/folder');
    });
    it('gets /folder from /folder/subfolder', () => {
      expect(dirname('/folder/subfolder')).to.equal('/folder');
    });
    it('gets / from /file.ext', () => {
      expect(dirname('/file.ext')).to.equal('/');
    });
    it('gets . from file.ext', () => {
      expect(dirname('file.ext')).to.equal('.');
    });
    it('gets / from /', () => {
      expect(dirname('/')).to.equal('/');
    });
    it('gets . from empty string', () => {
      expect(dirname('')).to.equal('.');
    });
  });

});
