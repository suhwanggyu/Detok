
def lcs_similarity(seed, target) :
    rowsize = len(seed)
    colsize = len(target)
    lcs = [[0 for col in range(colsize+1)] for row in range(rowsize+1)]
    for i in range(1,rowsize+1) :
        for j in range(1, colsize+1) :
            if seed[i-1] == target[j-1] :
                lcs[i][j] = lcs[i-1][j-1] + 1
            else :
                lcs[i][j] = max(lcs[i][j-1], lcs[i-1][j])
    return lcs[rowsize][colsize]/max(rowsize,colsize)

