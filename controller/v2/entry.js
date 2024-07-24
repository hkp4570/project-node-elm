import EntryModel from '../../models/v2/entry';

class Entry {
  async getEntry(req, res) {
    try {
      const entries = await EntryModel.find({});
      res.send(entries);
    } catch (err) {
      console.log('获取数据失败');
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: '获取数据失败'
      })
    }
  }
}

export default new Entry();
