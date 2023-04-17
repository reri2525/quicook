import React, { useState } from 'react';

const Category = () => {
  // 親カテゴリと子カテゴリの選択状態を管理するstate
  const [parentCategory, setParentCategory] = useState('');
  const [childCategory, setChildCategory] = useState('');

  // 親カテゴリが選択された際のイベントハンドラ
  const handleParentCategoryChange = (event) => {
    const selectedParentCategory = event.target.value;
    // 親カテゴリの選択状態を更新
    setParentCategory(selectedParentCategory);
    // 子カテゴリの選択状態をリセット
    setChildCategory('');
  };

  // 子カテゴリが選択された際のイベントハンドラ
  const handleChildCategoryChange = (event) => {
    const selectedChildCategory = event.target.value;
    // 子カテゴリの選択状態を更新
    setChildCategory(selectedChildCategory);
  };

  return (
    <div>
      {/* 親カテゴリのselectタグ */}
      <select value={parentCategory} onChange={handleParentCategoryChange}>
        <option value="">親カテゴリを選択してください</option>
        <option value="category1">カテゴリ1</option>
        <option value="category2">カテゴリ2</option>
        {/* 親カテゴリの選択肢を追加する */}
      </select>

      {/* 子カテゴリのselectタグ */}
      <select value={childCategory} onChange={handleChildCategoryChange}>
        <option value="">子カテゴリを選択してください</option>
        {/* 選択された親カテゴリに応じて子カテゴリの選択肢を動的に生成 */}
        {parentCategory === 'category1' && (
          <>
            <option value="childCategory1-1">子カテゴリ1-1</option>
            <option value="childCategory1-2">子カテゴリ1-2</option>
            {/* 子カテゴリの選択肢を追加する */}
          </>
        )}
        {parentCategory === 'category2' && (
          <>
            <option value="childCategory2-1">子カテゴリ2-1</option>
            <option value="childCategory2-2">子カテゴリ2-2</option>
            {/* 子カテゴリの選択肢を追加する */}
          </>
        )}
      </select>
    </div>
  );
};

export default Category;